import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  Text,
  Toast,
} from '@ant-design/react-native'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { Image, Pressable, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { code, login } from '~/api/login'
import useStore from '~/store/count.store'

const BasicFormBase: React.FC = () => {
  const [form] = Form.useForm<Parameters<typeof login>[0]>()
  const insets = useSafeAreaInsets()
  const { count, increase, decrease, reset } = useStore()

  const { data, refetch } = useQuery({
    queryKey: ['auth'],
    queryFn: code,
  })

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      Toast.show({
        type: 'success',
        content: '登录成功',
      })
    },
  })

  async function submitForm(values: Parameters<typeof login>[0]) {
    await loginMutate(values)
  }

  return (
    <Card style={{ padding: insets.top }} full>
      <Card.Header title="用户登录" />
      <Card.Body>
        <ScrollView>
          <Form<Parameters<typeof login>[0]>
            form={form}
            onFinish={submitForm}
          >
            <Form.Item>
              <Text>{ count }</Text>
              <Button onPress={increase} loading={isPending} type="primary">加一</Button>
              <Button onPress={decrease} loading={isPending} type="primary">减一</Button>
              <Button onPress={reset} loading={isPending} type="primary">重置</Button>
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            >
              <Input type="password" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  message: '请输入验证码',
                },
              ]}
            >
              <Input
                placeholder="请输入验证码"
                suffix={(
                  <Pressable onPress={() => refetch()}>
                    <Image
                      source={{ uri: data?.img }}
                      width={100}
                      height={30}
                      resizeMode="contain"
                    />
                  </Pressable>
                )}
              />
            </Form.Item>
            <Form.Item>
              <Flex>
                <Flex.Item>
                  <Button onPress={form.submit} loading={isPending} type="primary">提交</Button>
                </Flex.Item>
                <Flex.Item>
                  <Button type="ghost" onPress={() => form.resetFields()}>重置</Button>
                </Flex.Item>
              </Flex>
            </Form.Item>
          </Form>
        </ScrollView>
      </Card.Body>
    </Card>
  )
}

export default BasicFormBase
