import { Context } from "hono";
import { createMiddleware } from "hono/factory";
import db from "@/libs/db";

interface RoleMiddlewareOptions {
  roles: string[];
  strict?: boolean;
}

const roleMiddleware = ({ roles, strict = true }: RoleMiddlewareOptions) =>
  createMiddleware(async (c: Context, next) => {
    const userRole = c.get("userRole");

    if (!userRole) {
      return c.json(
        { message: "Unauthorized: Role not found" },
        { status: 403 }
      );
    }

    if (strict) {
      const hasAccess = roles.includes(userRole);
      if (!hasAccess) {
        return c.json(
          { message: "Unauthorized: Access denied" },
          { status: 403 }
        );
      }
    } else {
      const minRole = roles[0];
      const roleHierarchy = await getFilteredRoleHierarchy(userRole, minRole);
      const minRoleIndex = roleHierarchy.indexOf(minRole);
      const userRoleIndex = roleHierarchy.indexOf(userRole);
      const hasAccess = userRoleIndex >= minRoleIndex;

      if (!hasAccess) {
        return c.json(
          { message: "Unauthorized: Access denied" },
          { status: 403 }
        );
      }
    }

    await next();
  });

const getFilteredRoleHierarchy = async (
  roleName: string,
  minRole: string
): Promise<string[]> => {
  const hierarchy = await getRoleHierarchy(roleName);

  const minRoleIndex = hierarchy.indexOf(minRole);
  return hierarchy.slice(minRoleIndex >= 0 ? minRoleIndex : 0);
};

const getRoleHierarchy = async (roleName: string): Promise<string[]> => {
  const roleHierarchy = await db.role.findUnique({
    where: { name: roleName },
    include: {
      parent: true,
    },
  });

  const hierarchy: string[] = [];

  if (roleHierarchy) {
    hierarchy.push(roleHierarchy.name);

    if (roleHierarchy.parent) {
      const parentHierarchy = await getRoleHierarchy(roleHierarchy.parent.name);
      hierarchy.push(...parentHierarchy);
    }
  }

  return hierarchy;
};

export default roleMiddleware;
