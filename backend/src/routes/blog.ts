import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { JWT_SECRET } from "../config";
import {
  createBlogInput,
  updateBlogInput,
} from "@bhavitmishra/medium-common/build";
import { id } from "zod/v4/locales";
export const BlogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
  };
}>();

type JwtPayload = {
  id: string;
};

BlogRouter.use("/*", async (c, next) => {
  const headers = c.req.header("Authorization") || "";
  const token = headers.split(" ")[1];
  try {
    const resp = (await verify(token, JWT_SECRET)) as JwtPayload;

    if (resp) {
      c.set("userId", resp.id);
      await next();
    } else {
      return c.json({ msg: "errorrrr" });
    }
  } catch (error) {
    return c.json({
      msg: "youb are not logged in",
    });
  }
});

BlogRouter.get("/search", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const query = c.req.query("q") || "";

  const blogs = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({ blogs });
});

BlogRouter.get("/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = await c.req.query("id");

  const res = await prisma.post.findMany({
    where: {
      OR: [
        {
          authorId: id,
        },
        {
          id: id,
        },
      ],
    },
  });

  return c.json({
    userblog: res,
  });
});

BlogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    return c.json({
      msg: "enter valid inputs",
    });
  }
  const userId = c.get("userId");
  const res = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });
  return c.json({
    msg: "blog created successfully",
  });
});

BlogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    return c.json({
      msg: "enter valid input",
    });
  }
  const res = await prisma.post.update({
    data: {
      title: body.title,
      content: body.content,
    },
    where: {
      id: body.id,
    },
  });
  return c.json({
    id: res.id,
  });
});

BlogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({
    blogs,
  });
});

BlogRouter.delete("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.query("id");
  const cremovere = await prisma.comment.deleteMany({
    where: {
      id: id,
    },
  });
  const blogs = await prisma.post.delete({
    where: {
      // @ts-ignore
      id: id,
    },
  });

  return c.json({
    msg: "deleted the blog",
  });
});

BlogRouter.post("/comment", async (c) => {
  const { id: blogid, content } = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const comment = await prisma.comment.create({
    data: {
      blogId: blogid,
      content,
      authorId: c.get("userId"),
    },
  });

  return c.json({ msg: "Comment created", comment });
});

// 📌 GET: Fetch all comments for a blog
BlogRouter.get("/comment", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogId = c.req.query("blogId");

  if (!blogId) {
    return c.json({ error: "Missing blogId" }, 400);
  }

  const comments = await prisma.comment.findMany({
    where: { blogId },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return c.json({ comments }); // wrap in object
});

// 📌 DELETE: Delete comment
BlogRouter.delete("/comment", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const commentId = c.req.query("commentId");
  const userId = c.get("userId"); // from auth middleware

  if (!commentId) {
    return c.json({ error: "Missing commentId" }, 400);
  }

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    return c.json({ error: "Comment not found" }, 404);
  }

  if (comment.authorId !== userId) {
    return c.json({ error: "Unauthorized" }, 403);
  }

  await prisma.comment.delete({
    where: { id: commentId },
  });

  return c.json({ message: "Comment deleted" });
});
