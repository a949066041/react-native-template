import { Link, Redirect } from 'expo-router'
import { Button, Text, View } from 'react-native'
import { useStoreToken } from '~/store/auth'

export default function HomeScreen() {
  const [token] = useStoreToken()
  if (!token) {
    return <Redirect href="/login" />
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Link href="/login" asChild>
        <Button title="Go to Login" />
      </Link>
    </View>
  )
}
