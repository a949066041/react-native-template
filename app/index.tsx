import type { UserEntity } from '~/api/system/user.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Redirect, useRouter } from 'expo-router'
import { useMemo } from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { logout } from '~/api'
import { userPageOption } from '~/api/system/user'
import { useStoreToken } from '~/store/auth'

function RenderItem({ item }: { item: { id: number, email: string } }) {
  return (
    <View className=" flex flex-row justify-between leading-10 py-2">
      <Text className=" text-red-400">{item.id}</Text>
      <Text className=" text-red-400">{item.email}</Text>
    </View>
  )
}

function useLogout() {
  const router = useRouter()
  const [, setToken] = useStoreToken()
  return useMutation({
    mutationFn: logout,
    onMutate() {
      setToken('')
      router.replace('/login')
    },
  })
}

export default function HomeScreen() {
  const { data, isLoading, isError } = useQuery(userPageOption({ page: 0, size: 10 }))
  const { mutate: logoutAction } = useLogout()

  const dataValue = useMemo(() => {
    return data
      ? Array.from({ length: 1011 }).map((_, index) => ({
          id: index + 1,
          email: `${index}@example.com`,
        }))
      : []
  }, [data])

  if (isError) {
    return <Redirect href="/login" />
  }

  return (
    <SafeAreaView>
      <View className=" h-screen flex flex-col">
        <View className="flex-1">
          {
            !isLoading && (
              <FlatList
                data={dataValue}
                keyExtractor={item => `${item.id}`}
                renderItem={RenderItem}
              />
            )
          }

          <Pressable onPress={() => logoutAction()}>
            <View className=" bg-red-700 mx-auto rounded-lg mt-4 flex justify-center items-center">
              <Text className=" text-xl font-bold px-2">123</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}
