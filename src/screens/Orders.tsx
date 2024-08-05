import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, List as ListView, Input } from '@ant-design/react-native';
import { NavigationProp } from '@react-navigation/native';
import { List, UseOrder } from '@/contexts/OrderContext';
import OrderListItem from '@/components/OrderListItem';

const Orders = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [search, setSearch] = React.useState<List[] | null>(null);
  const { onGetOrders, orders, onSelectOrder: selectOrder } = UseOrder();

  const filterOrders = (searchText: string): List[] | null => {
    if (!searchText) {
      return null;
    }

    const lowercasedSearchText = searchText.toLowerCase();
    return (
      orders?.filter(
        (order: List) =>
          order.pessoa.nome?.toLowerCase().includes(lowercasedSearchText) ||
          order.pessoa.cpfCnpj?.toLowerCase().includes(lowercasedSearchText) ||
          order.pessoa.codigo?.toLowerCase().includes(lowercasedSearchText),
      ) || null
    );
  };

  const onSearch = (searchText: string) => {
    setSearch(filterOrders(searchText));
  };

  const goToPayment = (order: List) => {
    selectOrder(order);
    navigation.navigate('Payment');
  };

  useEffect(() => {
    onGetOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Input
          placeholder="Search"
          type="text"
          style={styles.search}
          onChangeText={onSearch}
        />
      </View>
      <View style={styles.inner}>
        <ListView>
          {search
            ? search?.map((order: List) => (
                <OrderListItem
                  key={order.numeroFatura}
                  order={order}
                  goToPayment={goToPayment}
                />
              ))
            : orders?.map((order: List) => (
                <OrderListItem
                  key={order.numeroFatura}
                  order={order}
                  goToPayment={goToPayment}
                />
              ))}
        </ListView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  search: {
    backgroundColor: '#fff',
  },
});

export default Orders;
