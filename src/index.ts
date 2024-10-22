import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import authRoute from "@/routes/auth";
import userRoute from "./routes/user";
import geoRoute from "./routes/geo";
import facilityRoute from "./routes/facility";
import placeRoute from "./routes/place";
import placeFavoriteRoute from "./routes/placeFavorite";

const app = new OpenAPIHono();

// Global middleware
app
  .use(
    cors({
      origin: "*",
    })
  )
  .use(logger());

// Web routes
app.get("/", (c) => {
  return c.json(
    {
      description: "API for CheckCafe project.",
      ui: `/ui`,
    },
    200
  );
});
app.get(
  "/ui",
  apiReference({
    pageTitle: "CheckCafe API Reference",
    spec: {
      url: "/openapi.json",
    },
  })
);
app.doc("/openapi.json", {
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "CheckCafe API",
    description: "API for CheckCafe project.",
  },
});

// API route
app.route("/auth", authRoute);
app.route("/user", userRoute);
app.route("/geo", geoRoute);
app.route("/facility", facilityRoute);
app.route("/place", placeRoute);
app.route("/place-favorite", placeFavoriteRoute);

export default app;
