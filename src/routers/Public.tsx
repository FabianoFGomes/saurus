import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '@/screens/SignIn.tsx';

const Stack = createNativeStackNavigator();

function Public() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Public;
