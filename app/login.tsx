import type { ILoginParams } from '~/api/auth/auth.type'
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  Text,
  Toast,
} from '@ant-design/react-native'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { login } from '~/api'
import { useStoreToken } from '~/store/auth'

const LoginScreen: React.FC = () => {
  const [form] = Form.useForm<ILoginParams>()
  const insets = useSafeAreaInsets()

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

  const [currentToken, setToken] = useStoreToken()

  async function submitForm(values: ILoginParams) {
    const { token } = await loginMutate(values)
    setToken(token)
  }

  return (
    <Card style={{ padding: insets.top }} full>
      <Card.Header title="用户登录" />
      <Card.Body>
        <ScrollView>
          <Form<ILoginParams>
            form={form}
            onFinish={submitForm}
          >
            <Form.Item label="用户名">
              <Text>
                123
                { currentToken }
              </Text>
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

export default LoginScreen
