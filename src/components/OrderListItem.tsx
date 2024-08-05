import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Text, List as ListView } from '@ant-design/react-native';
import { List } from '@/contexts/OrderContext';
import formatCurrency from '@/utils/currency';

const Item = ListView.Item;
const Brief = Item.Brief;

interface OrderListItemProps {
  order: List;
  goToPayment: (order: List) => void;
}

function OrderListItem(props: OrderListItemProps) {
  const { order, goToPayment } = props;
  return (
    <Item
      styles={{
        Line: {
          ...styles.itemLine,
        },
      }}
      extra={formatCurrency(order.valorFatura)}
      arrow="horizontal"
      thumb={
        <Icon
          name={order.pagamento ? 'check' : 'close'}
          size="md"
          color={order.pagamento ? 'green' : 'red'}
          style={styles.icon}
        />
      }
      onPress={() => goToPayment(order)}>
      <Text style={styles.title}>{order.pessoa.nome}</Text>
      <Brief wrap>CPf/CNPJ: {order.pessoa.cpfCnpj}</Brief>
      <Brief wrap>Code: {order.pessoa.codigo}</Brief>
    </Item>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: '#333',
  },
  itemLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  icon: {
    marginRight: 10,
  },
});

export default OrderListItem;
