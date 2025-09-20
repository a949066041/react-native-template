import * as z from 'zod'

export const DeptSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export type Dept = z.infer<typeof DeptSchema>

export const RoleSchema = z.object({
  dataScope: z.string(),
  id: z.number(),
  level: z.number(),
  name: z.string(),
})

export type Role = z.infer<typeof RoleSchema>

export const UserSchema = z.object({
  createBy: z.string(),
  createTime: z.coerce.date(),
  email: z.string(),
  gender: z.string(),
  id: z.number(),
})
export type UserEntity = z.infer<typeof UserSchema>
