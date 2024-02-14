import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signInData, signUpData } from '@saurav1509/medium-common'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>()


userRouter.post('/signup', async (c) => {

  const body = await c.req.json();

  const { success } = signUpData.safeParse(body)

  if (!success) {
    c.status(400)
    return c.json({
      message: "Wrong data payload sent"
    })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.username,
        password: body.password
      },
    })

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)

    return c.json({ jwt: token })
  }
  catch (e) {
    return c.status(403)
  }
})
userRouter.post('/signin', async (c) => {

  const body = await c.req.json();

  const { success } = signInData.safeParse(body)

  if (!success) {
    c.status(400);
    return c.json({
      message: "Invalid Inputs"
    })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const user = await prisma.user.findUnique({
    where: {
      email: body.username,
      password: body.password
    },
  })

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" })
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET)

  return c.json({ jwt: token })
})


