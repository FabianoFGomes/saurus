import React from 'react';
import { LogBox, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Provider } from '@ant-design/react-native';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Routers from '@/routers';
import { AuthProvider } from '@/contexts/AuthContext';
import { OrderProvider } from '@/contexts/OrderContext';
import { PaymentProvider } from '@/contexts/PaymentContext';

enableScreens();

function App(): React.JSX.Element {
  LogBox.ignoreAllLogs();

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthProvider>
            <OrderProvider>
              <PaymentProvider>
                <Routers />
              </PaymentProvider>
            </OrderProvider>
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
