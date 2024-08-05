import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  Card,
  Icon,
  Radio,
  View,
  Button,
  Text,
} from '@ant-design/react-native';
import { UseOrder } from '@/contexts/OrderContext';
import formatCurrency from '@/utils/currency';
import EmptyState from '@/components/EmptyState';
import { OnGroupChangeParams } from '@ant-design/react-native/lib/radio/PropsType';
import {
  PaymentType,
  PaymentTypes,
  UsePayment,
} from '@/contexts/PaymentContext';
import { NavigationProp } from '@react-navigation/native';

const RadioItem = Radio.RadioItem;

function Payments({ navigation }: { navigation: NavigationProp<any> }) {
  const { orderSelected } = UseOrder();
  const { onSelectPayment, selectedPayment } = UsePayment();

  const onSelectChange = (e: OnGroupChangeParams) => {
    onSelectPayment(e.target.value as PaymentType);
  };

  const goToPay = () => {
    navigation.navigate('Pay');
  };

  useEffect(() => {
    return () => {
      onSelectPayment(null);
    };
  }, [onSelectPayment]);

  if (!orderSelected) {
    return <EmptyState message="Order Not Found!" />;
  }

  const orderDetails = orderSelected.origem[0];

  return (
    <View style={styles.container}>
      <Card style={styles.inner}>
        <Card.Header
          title={orderSelected.pessoa.nome}
          extra={formatCurrency(orderSelected.valorFatura)}
          thumb={
            <Icon
              name={orderSelected.pagamento ? 'check' : 'close'}
              size="md"
              color={orderSelected.pagamento ? 'green' : 'red'}
              style={styles.icon}
            />
          }
        />
        <Card.Body>
          <View style={styles.inner}>
            <Text style={styles.bodyTitle}>{orderDetails.origem}</Text>
            <Text style={styles.bodyText}>{orderDetails.numero}</Text>
          </View>
          <View style={styles.inner}>
            <Radio.Group onChange={onSelectChange} value={selectedPayment!}>
              <RadioItem value={PaymentTypes.credit}>Credit</RadioItem>
              <RadioItem value={PaymentTypes.debit}>Debit</RadioItem>
              <RadioItem value={PaymentTypes.pix}>PIX</RadioItem>
            </Radio.Group>
          </View>
        </Card.Body>
        <Card.Footer
          extra={
            <Button
              type="primary"
              onPress={goToPay}
              disabled={!selectedPayment}>
              Next
            </Button>
          }
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  inner: {
    padding: 8,
  },
  icon: {
    marginRight: 10,
  },
  bodyTitle: {
    fontSize: 16,
    color: '#333',
  },
  bodyText: {
    fontSize: 14,
    color: '#666',
  },
});

export default Payments;
