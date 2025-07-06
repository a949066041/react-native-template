import { Button } from '@react-navigation/elements'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { code } from '~/api/login'

export default function PizzaTranslator() {
  const { data, refetch, isFetched } = useQuery({
    queryKey: ['auth code'],
    queryFn: code,
  })
  return (
    <SafeAreaView>
      <View>
        <Button onPress={() => refetch()}>刷新</Button>
        <Text>{ isFetched ? 'loading' : 'success' }</Text>
        <Text>{ data?.uuid }</Text>
        <Image source={{ uri: data?.img }} width={200} height={200} resizeMode="contain" />
      </View>
    </SafeAreaView>
  )
}
