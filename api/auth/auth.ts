import type { ILoginParams, ILoginRes } from './auth.type'
import { fetchClient } from '../client'

export function login(data: ILoginParams) {
  return fetchClient.post<ILoginRes>('/auth/app/login', data)
}
