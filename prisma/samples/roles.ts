export enum Role {
  SUPER_ADMIN = "SUPER ADMIN",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  USER = "USER",
}

type RoleRecord = {
  name: Role;
  parent?: Role | null;
};

const roles: RoleRecord[] = [
  { name: Role.SUPER_ADMIN },
  { name: Role.ADMIN, parent: Role.SUPER_ADMIN },
  { name: Role.MODERATOR, parent: Role.ADMIN },
  { name: Role.USER, parent: Role.MODERATOR },
];

export default roles;
