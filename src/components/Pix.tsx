import React from 'react';
import { Form, Input } from '@ant-design/react-native';
function Pix() {
  return (
    <Form layout={'vertical'}>
      <Form.Item
        name="key"
        styles={{
          Line: {
            borderBottomWidth: 0.5,
            borderBottomColor: '#333',
          },
        }}>
        <Input type="text" placeholder="Key PIX" onChangeText={() => {}} />
      </Form.Item>
    </Form>
  );
}

export default Pix;
