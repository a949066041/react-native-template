import { fetchClient } from './client'

export function code() {
  return fetchClient.get<{ uuid: string, img: string }>('/auth/code')
}

export function login(data: {
  username: string
  password: string
  code: string
  uuid: string
}) {
  return fetchClient.post<{ token: string }>('/auth/login', data)
}
