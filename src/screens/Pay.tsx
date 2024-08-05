import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, View, Button, Text } from '@ant-design/react-native';
import { UseOrder } from '@/contexts/OrderContext';
import formatCurrency from '@/utils/currency';
import EmptyState from '@/components/EmptyState';
import { PaymentTypes, UsePayment } from '@/contexts/PaymentContext';
import CardPayment from '@/components/CardPayment';
import Pix from '@/components/Pix';

function Pay() {
  const { orderSelected } = UseOrder();
  const { selectedPayment } = UsePayment();

  if (!orderSelected) {
    return <EmptyState message="Order Not Found!" />;
  }

  return (
    <View style={styles.container}>
      <Card style={styles.inner}>
        <Card.Header
          title={<Text style={styles.cardHeaderTitle}>{selectedPayment}</Text>}
          extra={formatCurrency(orderSelected.valorFatura)}
        />
        <Card.Body>
          <View style={styles.inner}>
            {selectedPayment === PaymentTypes.pix ? <Pix /> : <CardPayment />}
          </View>
        </Card.Body>
        <Card.Footer extra={<Button type="primary">Pay</Button>} />
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
  cardHeaderTitle: {
    fontSize: 16,
    color: '#333',
    textTransform: 'capitalize',
  },
});

export default Pay;
