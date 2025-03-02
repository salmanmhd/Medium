import z from 'zod';

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  name: z.string().optional(),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const createBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  id: z.string(),
});

export type CreateBlog = z.infer<typeof createBlogSchema>;
export type UpdateBlog = z.infer<typeof updateBlogSchema>;

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
