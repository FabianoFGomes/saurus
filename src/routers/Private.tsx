import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderRight from '@/components/HeaderRight';
import Orders from '@/screens/Orders';
import Payments from '@/screens/Payments';
import Pay from '@/screens/Pay';

const Stack = createNativeStackNavigator();

const options = {
  headerShown: true,
  headerRight: HeaderRight,
};

function PaymentsGroup() {
  return (
    <Stack.Navigator initialRouteName="Orders">
      <Stack.Screen name="Payment" component={Payments} options={options} />
      <Stack.Screen name="Pay" component={Pay} options={options} />
    </Stack.Navigator>
  );
}

function Private() {
  return (
    <Stack.Navigator initialRouteName="Orders">
      <Stack.Screen name="Orders" component={Orders} options={options} />
      <Stack.Screen
        name="Payment"
        component={PaymentsGroup}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Private;
