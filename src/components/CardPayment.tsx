import React from 'react';
import { Form, Input } from '@ant-design/react-native';

function CardPayment() {
  return (
    <Form layout={'vertical'}>
      <Form.Item
        name="name"
        styles={{
          Line: {
            borderBottomWidth: 0.5,
            borderBottomColor: '#333',
          },
        }}>
        <Input type="text" placeholder="Name" onChangeText={() => {}} />
      </Form.Item>
      <Form.Item
        name="cardNumber"
        styles={{
          Line: {
            borderBottomWidth: 0.5,
            borderBottomColor: '#333',
          },
        }}>
        <Input
          type="number"
          placeholder="Card Number"
          onChangeText={() => {}}
        />
      </Form.Item>
      <Form.Item
        name="senha"
        styles={{
          Line: {
            borderBottomWidth: 0.5,
            borderBottomColor: '#333',
          },
        }}>
        <Input
          type="text"
          placeholder="Expiration (mm/yy)"
          onChangeText={() => {}}
        />
      </Form.Item>
      <Form.Item
        name="senha"
        styles={{
          Line: {
            borderBottomWidth: 0.5,
            borderBottomColor: '#333',
          },
        }}>
        <Input
          type="number"
          placeholder="Security Code"
          onChangeText={() => {}}
        />
      </Form.Item>
    </Form>
  );
}
export default CardPayment;
