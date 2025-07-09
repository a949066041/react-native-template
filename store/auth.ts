import { auth, useStorage } from './mmkv'

export function useStoreToken() {
  const [token, setToken] = useStorage(auth, ['token'])

  return [token, setToken] as const
}
