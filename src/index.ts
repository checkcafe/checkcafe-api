import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import authRoute from "@/routes/authRoute";

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

export default app;
