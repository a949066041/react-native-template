import { patchFetch } from '~/api/patch'
import { auth } from '~/store/mmkv'
import 'react-native-reanimated'

function fetchAuthIntercept(req: RequestInit) {
  const token = auth.get(['token'])
  if (token) {
    req.headers = {
      ...req.headers,
      Authorization: `Bearer ${token}`,
    }
  }
  return req
}

function fetchResponseIntercepet(res: Response) {
  if (res.status !== 200) {
    throw new Error('error request')
  }
  return res
}

patchFetch([fetchAuthIntercept], fetchResponseIntercepet, 'http://192.168.2.91:8000')
