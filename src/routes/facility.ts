import type { Context } from "hono";
import { OpenAPIHono } from "@hono/zod-openapi";
import { querySchema } from "@/schemas/query";
import * as facilityService from "@/services/facility";

const facilityRoute = new OpenAPIHono();
const API_TAGS = ["Facilities"];

// Facilities Route
facilityRoute.openapi(
  {
    method: "get",
    path: "/",
    summary: "Facility list",
    description: "Get a list of facilities.",
    request: {
      query: querySchema.omit({ page: true, limit: true }),
    },
    responses: {
      200: {
        description: "Facilities retrieved successfully",
      },
      404: {
        description: "Facilities not found",
      },
      500: {
        description: "Failed to retrieve facilities",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    try {
      const { filter, sort } = c.req.query();
      const facilities = await facilityService.getFacilities(filter, sort);

      return c.json(facilities, 200);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Failed to retrieve facilities" },
        500
      );
    }
  }
);

export default facilityRoute;
