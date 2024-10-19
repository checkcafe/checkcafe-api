import { PrismaClient } from "@prisma/client";
import { passwordHash } from "../src/libs/password";
import roles from "./samples/roles";
import users from "./samples/users";
import contries from "./samples/countries";
import states from "./samples/states";
import cities from "./samples/cities";
import features from "./samples/features";

const prisma = new PrismaClient();

async function upsertRoles() {
  console.log("🌱 Seeding roles...");

  for (const role of roles) {
    console.log(`🎭 Role: ${role.name}`);

    let parentRole;
    if (role.parent) {
      parentRole = await prisma.role.findUnique({
        where: { name: role.parent },
      });

      if (!parentRole) {
        parentRole = await prisma.role.create({
          data: { name: role.parent },
        });
      }
    }

    await prisma.role.upsert({
      where: { name: role.name },
      update: {
        parentId: parentRole ? parentRole.id : null,
      },
      create: {
        name: role.name,
        parentId: parentRole ? parentRole.id : null,
      },
    });
  }
}

async function upsertUsers() {
  console.log("🌱 Seeding users...");

  for (const user of users) {
    console.log(`👤 User: ${user.username}`);

    let role;
    if (user.role) {
      role = await prisma.role.findUnique({
        where: {
          name: user.role,
        },
      });

      if (!role) {
        console.error(`🎭 Role not found for user: ${user.username}`);
        continue;
      }
    }

    const hashedPassword = await passwordHash(user.password);
    await prisma.user.upsert({
      where: { username: user.username },
      update: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        roleId: role.id,
      },
      create: {
        name: user.name,
        email: user.email,
        username: user.username,
        password: hashedPassword,
        roleId: role.id,
      },
    });
  }
}

async function upsertCountries() {
  console.log("🌱 Seeding countries...");

  for (const country of contries) {
    console.log(`🌎 Country: ${country.name}`);

    await prisma.country.upsert({
      where: { code: country.code },
      update: {
        name: country.name,
      },
      create: {
        name: country.name,
        code: country.code,
      },
    });
  }
}

async function upsertStates() {
  console.log("🌱 Seeding states...");

  for (const state of states) {
    console.log(`🌎 State: ${state.name}`);

    let country;
    if (state.country) {
      country = await prisma.country.findUnique({
        where: { name: state.country },
      });

      if (!country) {
        console.error(`🌎 Country not found for state: ${state.name}`);
        continue;
      }
    }

    await prisma.state.upsert({
      where: { name: state.name },
      update: {
        name: state.name,
        countryId: country ? country.id : null,
      },
      create: {
        name: state.name,
        countryId: country ? country.id : null,
      },
    });
  }
}

async function upsertCities() {
  console.log("🌱 Seeding cities...");

  for (const city of cities) {
    console.log(`🌎 City: ${city.name}`);

    let state;
    if (city.state) {
      state = await prisma.state.findUnique({
        where: { name: city.state },
      });

      if (!state) {
        console.error(`🌎 State not found for city: ${city.name}`);
        continue;
      }
    }

    await prisma.city.upsert({
      where: { name: city.name },
      update: {
        name: city.name,
        stateId: state ? state.id : null,
        latitude: city.lat ? city.lat : null,
        longitude: city.long ? city.long : null,
      },
      create: {
        name: city.name,
        stateId: state ? state.id : null,
        latitude: city.lat ? city.lat : null,
        longitude: city.long ? city.long : null,
      },
    });
  }
}

async function upsertFeatureCategories() {
  console.log("🌱 Seeding feature categories and features...");

  for (const categoryData of features) {
    console.log(`📂 Category: ${categoryData.category}`);

    const category = await prisma.featureCategory.upsert({
      where: { name: categoryData.category },
      update: {
        name: categoryData.category,
        description: categoryData.description || null,
      },
      create: {
        name: categoryData.category,
        description: categoryData.description || null,
      },
    });

    for (const feature of categoryData.features) {
      console.log(`🛠️ Feature: ${feature.name} (Category: ${category.name})`);

      await prisma.feature.upsert({
        where: { name: feature.name },
        update: {
          name: feature.name,
          description: feature.description,
          featureCategoryId: category.id,
        },
        create: {
          name: feature.name,
          description: feature.description,
          featureCategoryId: category.id,
        },
      });
    }
  }
}

async function main() {
  await prisma.$transaction(async (tx) => {
    await upsertRoles();
    await upsertUsers();
    await upsertCountries();
    await upsertStates();
    await upsertCities();
    await upsertFeatureCategories();
  });
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seeding finished. Disconnecting...");
    await prisma.$disconnect();
    process.exit(0);
  });
