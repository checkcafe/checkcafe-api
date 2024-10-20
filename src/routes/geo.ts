import type { Context } from "hono";
import { OpenAPIHono } from "@hono/zod-openapi";
import { QuerySchema } from "@/schemas/query";
import * as geoService from "@/services/geo";

const geoRoute = new OpenAPIHono();
const API_TAGS = ["Geo"];

// Countries Route
geoRoute.openapi(
  {
    method: "get",
    path: "/countries",
    summary: "Countries",
    description: "Get a list of countries.",
    request: {
      query: QuerySchema.omit({ page: true, limit: true }),
    },
    responses: {
      200: {
        description: "Countries retrieved successfully",
      },
      404: {
        description: "Countries not found",
      },
      500: {
        description: "Failed to retrieve countries",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    try {
      const { filter, sort } = c.req.query();
      const result = await geoService.getCountries(filter, sort);

      if (!result || result.length === 0) {
        return c.json({ message: "No countries found!" }, 404);
      }

      return c.json(result, 200);
    } catch (error: Error | any) {
      return c.json({ message: error.message }, 500);
    }
  },
);

// States Route
geoRoute.openapi(
  {
    method: "get",
    path: "/states",
    summary: "States",
    description: "Get a list of states.",
    request: {
      query: QuerySchema.omit({ page: true, limit: true }),
    },
    responses: {
      200: {
        description: "States retrieved successfully",
      },
      404: {
        description: "States not found",
      },
      500: {
        description: "Failed to retrieve states",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    try {
      const { filter, sort } = c.req.query();
      const result = await geoService.getStates(filter, sort);

      if (!result || result.length === 0) {
        return c.json({ message: "No states found!" }, 404);
      }

      return c.json(result, 200);
    } catch (error: Error | any) {
      return c.json({ message: error.message }, 500);
    }
  },
);

// Cities Route
geoRoute.openapi(
  {
    method: "get",
    path: "/cities",
    summary: "Cities",
    description: "Get a list of cities.",
    request: {
      query: QuerySchema.omit({ page: true, limit: true }),
    },
    responses: {
      200: {
        description: "Cities retrieved successfully",
      },
      404: {
        description: "Cities not found",
      },
      500: {
        description: "Failed to retrieve cities",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    try {
      const { filter, sort } = c.req.query();
      const result = await geoService.getCities(filter, sort);

      if (!result || result.length === 0) {
        return c.json({ message: "No cities found!" }, 404);
      }

      return c.json(result, 200);
    } catch (error: Error | any) {
      return c.json({ message: error.message }, 500);
    }
  },
);

export default geoRoute;
