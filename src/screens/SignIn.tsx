import React, { useState } from 'react';
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  Button,
  Input,
  WhiteSpace,
  Form,
  View,
  Toast,
} from '@ant-design/react-native';
import { UseAuth } from '@/contexts/AuthContext';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [aplicationId] = useState('061f92f5-f2a2-410a-8e2b-b3a28132c258');
  const { onLogin } = UseAuth();

  const handleLogin = async () => {
    const { error } = await onLogin(username, password, aplicationId);
    if (error) {
      Toast.fail('Login failed. Please try again.');
    } else {
      Toast.success('Login successful!');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Form
            layout={'vertical'}
            renderHeader={'Sign In'}
            styles={{
              Header: {
                fontSize: 24,
                marginBottom: 20,
              },
            }}>
            <Form.Item name="usuario">
              <Input
                type="text"
                placeholder="User"
                onChangeText={setUsername}
              />
            </Form.Item>
            <WhiteSpace size="lg" />
            <Form.Item name="senha">
              <Input
                type="password"
                placeholder="Password"
                onChangeText={setPassword}
              />
            </Form.Item>
            <WhiteSpace size="lg" />
            <Button type="primary" onPress={handleLogin}>
              Login
            </Button>
          </Form>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default SignIn;
