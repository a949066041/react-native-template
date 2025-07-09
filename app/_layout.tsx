import { Provider } from '@ant-design/react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import {
  QueryClientProvider,
} from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useColorScheme } from '~/hooks/useColorScheme'

import { useDevtools } from '~/setup/devtools.setup'
import { queryClient } from '~/setup/query.setup'
import '~/setup/fetch.setup'
import '~/setup/style.setup'

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useDevtools()

  if (!loaded) {
    // Async font loading only occurs in development.
    return null
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <SafeAreaProvider>
            <Stack
              initialRouteName="login"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
              <Stack.Screen name="index" options={{ title: 'Home' }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
            </Stack>
          </SafeAreaProvider>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  )
}
