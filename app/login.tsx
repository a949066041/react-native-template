import type { ILoginParams } from '~/api/auth/auth.type'
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  Toast,
} from '@ant-design/react-native'
import { useMutation } from '@tanstack/react-query'
import { Redirect } from 'expo-router'
import React from 'react'
import { ScrollView, View } from 'react-native'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { login } from '~/api'
import { useStoreToken } from '~/store/auth'

const LoginScreen: React.FC = () => {
  const [form] = Form.useForm<ILoginParams>()
  const [currentToken, setToken] = useStoreToken()
  const width = useSharedValue(100)
  const { isPending, mutateAsync: loginMutate } = useMutation({
    mutationKey: ['login', '1', form.getFieldsValue()],
    mutationFn: login,
    onSuccess: () => {
      Toast.show({
        type: 'success',
        content: '登录成功',
      })
    },
  })

  async function submitForm(values: ILoginParams) {
    const { token } = await loginMutate(values)
    setToken(token)
  }

  if (currentToken) {
    return <Redirect href="/" />
  }

  return (
    <SafeAreaView>
      <View className=" bg-white h-screen flex">
        <Card>
          <Card.Header title="用户登录" />
          <Card.Body>
            <ScrollView>
              <Form<ILoginParams>
                form={form}
                onFinish={submitForm}
              >
                <Form.Item>
                  <Animated.View
                    style={{
                      width,
                      height: 100,
                      backgroundColor: 'violet',
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="username"
                  initialValue="admin"
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
                  initialValue="123456"
                  rules={[
                    {
                      required: true,
                      message: '请输入密码',
                    },
                  ]}
                >
                  <Input type="password" placeholder="请输入密码" />
                </Form.Item>
                <Form.Item>
                  <Flex>
                    <Flex.Item>
                      <Button onPress={form.submit} loading={isPending} type="primary">提交</Button>
                    </Flex.Item>
                    <Flex.Item>
                      <Button
                        type="ghost"
                        onPress={() => {
                          width.value = withSpring(width.value + 50)
                          form.resetFields()
                        }}
                      >
                        重置
                      </Button>
                    </Flex.Item>
                  </Flex>
                </Form.Item>
              </Form>
            </ScrollView>
          </Card.Body>
        </Card>
      </View>
    </SafeAreaView>

  )
}

export default LoginScreen
