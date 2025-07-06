import { patchFetch } from '~/api/patch'
import 'react-native-reanimated'

function fetchAuthIntercept(req: RequestInit) {
  return req
}

function fetchResponseIntercepet(res: Response) {
  if (res.status !== 200) {
    throw new Error('error request')
  }
  return res
}

patchFetch([fetchAuthIntercept], fetchResponseIntercepet, 'http://192.168.2.91:8000')
