import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogData, updateBlogData } from '@saurav1509/medium-common'

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string
  }
}>()

blogRouter.use("/*", async (c, next) => {

  const jwt = c.req.header("Authorization") || "";

  if (!jwt) {
    c.status(401);
    return c.json({
      error: "unauthorized"
    })
  }

  const authHeader = jwt.split(" ")[1];

  const user = await verify(authHeader, c.env.JWT_SECRET);

  if (user) {
    c.set("userId", user.id)
    await next();
  } else {
    c.status(403)
    return c.json({
      message: "You are not logged in"
    })
  }

})


blogRouter.post('/', async (c) => {

  const body = await c.req.json();

  const { success } = createBlogData.safeParse(body)

  if (!success) {
    c.status(400);
    return c.json({
      message: "Invalid Inputs"
    })
  }

  const authorId = c.get("userId")

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())


  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId
    }
  })

  return c.json({
    id: blog.id
  })

})

blogRouter.put('/', async (c) => {

  const body = await c.req.json();

  const { success } = updateBlogData.safeParse(body)

  if (!success) {
    c.status(400);
    return c.json({
      message: "Invalid Inputs"
    })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.post.update({
    where: {
      id: body.id
    },
    data: {
      title: body.title,
      content: body.content
    }
  })

  return c.json({
    message: "successfully updated the Blog"
  })
})


// add pagination
blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true
        }
      }
    }
  });

  return c.json({
    blogs
  })
})


blogRouter.get('/:id', async (c) => {
  const id = c.req.param('id');

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id
      },
      select: {
        title: true,
        content: true,
        id: true,
        author: {
          select: {
            name: true
          }
        }
      }
    })

    return c.json({
      blog
    })
  } catch (e) {
    c.status(411)
    return c.json({
      message: "Error while fetching blog post"
    })
  }
})


