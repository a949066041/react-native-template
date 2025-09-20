import type { UserEntity } from './user.type'
import { queryOptions } from '@tanstack/react-query'
import { fetchClient } from '../client'

interface ICommonPage {
  page: number
  size: number
}

interface ICommonPageRes {
  content: UserEntity[]
  totalElements: number
}

export function userPage(params: ICommonPage) {
  return fetchClient.get<ICommonPageRes>('/api/users', params)
}

export function userPageOption(params: ICommonPage) {
  return queryOptions({
    queryKey: ['userPage', params],
    queryFn: () => userPage(params),
  })
}
