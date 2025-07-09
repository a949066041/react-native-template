import * as z from 'zod'

export const LoginSchema = z.object({
  username: z.string().min(1, '请输入用户名'),
  password: z.string().min(1, '请输入密码'),
})

export const LoginResSchema = z.object({
  token: z.string(),
})

export type ILoginParams = z.infer<typeof LoginSchema>
export type ILoginRes = z.infer<typeof LoginResSchema>
