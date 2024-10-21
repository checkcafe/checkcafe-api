import { PrismaClient } from "@prisma/client";
import { passwordHash } from "../src/libs/password";
import cliProgress from "cli-progress";
import roles from "./samples/roles";
import users from "./samples/users";
import contries from "./samples/countries";
import states from "./samples/states";
import cities from "./samples/cities";
import facility from "./samples/facility";

const prisma = new PrismaClient();

const progressBar = new cliProgress.SingleBar({
  format: "{bar} | {percentage}% | {value}/{total} {type}",
  barCompleteChar: "\u2588",
  barIncompleteChar: "\u2591",
  hideCursor: true,
});

async function upsertRoles() {
  progressBar.start(roles.length, 0, { type: "Roles" });

  for (const role of roles) {
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

    progressBar.increment();
  }
  progressBar.stop();
}

async function upsertUsers() {
  progressBar.start(users.length, 0, { type: "Users" });

  for (const user of users) {
    let role;
    if (user.role) {
      role = await prisma.role.findUnique({
        where: { name: user.role },
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

    progressBar.increment();
  }
  progressBar.stop();
}

async function upsertCountries() {
  progressBar.start(contries.length, 0, { type: "Countries" });

  for (const country of contries) {
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
    progressBar.increment();
  }
  progressBar.stop();
}

async function upsertStates() {
  progressBar.start(states.length, 0, { type: "States" });

  for (const state of states) {
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
    progressBar.increment();
  }
  progressBar.stop();
}

async function upsertCities() {
  progressBar.start(cities.length, 0, { type: "Cities" });

  for (const city of cities) {
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
    progressBar.increment();
  }
  progressBar.stop();
}

async function upsertFeatureCategories() {
  progressBar.start(facility.length, 0, { type: "Feature Categories" });

  for (const categoryData of facility) {
    const category = await prisma.facilityCategory.upsert({
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

    for (const facility of categoryData.facilties) {
      await prisma.facility.upsert({
        where: { name: facility.name },
        update: {
          name: facility.name,
          description: facility.description,
          facilityCategoryId: category.id,
        },
        create: {
          name: facility.name,
          description: facility.description,
          facilityCategoryId: category.id,
        },
      });
    }
    progressBar.increment();
  }
  progressBar.stop();
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
    await prisma.$disconnect();
    process.exit(0);
  });
