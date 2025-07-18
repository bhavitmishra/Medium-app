import { Hono } from "hono";
import UserRouter from "./routes/user";
import { verify } from "hono/jwt";
import { JWT_SECRET } from "./config";
import { he } from "zod/v4/locales";
import { BlogRouter } from "./routes/blog";
import { cors } from "hono/cors";
const app = new Hono();
app.use("*", cors());
app.route("/api/v1/user/", UserRouter);
app.route("/api/v1/blog/", BlogRouter);

export default app;
