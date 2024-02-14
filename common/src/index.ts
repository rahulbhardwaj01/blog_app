import { z } from "zod"

export const signUpData = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export const signInData = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export const createBlogData = z.object({
    title: z.string(),
    content: z.string()
})

export const updateBlogData = z.object({
    title: z.string(),
    content: z.string()
})

export type signUpData = z.infer<typeof signUpData>
export type signInData = z.infer<typeof signInData>
export type createBlogData = z.infer<typeof createBlogData>
export type updateBlogData = z.infer<typeof updateBlogData>