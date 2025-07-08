import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { JWT_SECRET } from "../config";
import { signinInput, signupInput } from "@bhavitmishra/medium-common/build";
import bcrypt from "bcryptjs";
import { use } from "hono/jsx";
const UserRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
  };
}>();

UserRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);
  if (!success) {
    return c.json({
      msg: "Inputs incorrect",
    });
  }
  const hash = await bcrypt.hash(body.password, 10);
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hash,
    },
  });
  const token = await sign({ id: user.id }, JWT_SECRET);
  return c.json({
    msg: "USer SUccessfully Registered",
    token: token,
    id: user.id,
  });
});

UserRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Incorrect Inputs",
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (!user) {
    return c.json({ msg: "incorrect email or password" });
  }
  const isMatch = await bcrypt.compare(body.password, user.password);
  if (!isMatch) {
    return c.json({ msg: "Invalid credentials" }, 401);
  } else {
    const token = await sign({ id: user.id }, JWT_SECRET);
    return c.json({
      msg: "signed In successfully",
      token,
      name: user.name,
      id: user.id,
    });
  }
});

export default UserRouter;
