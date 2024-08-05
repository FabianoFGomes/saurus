import React from 'react';
import { UseAuth } from '@/contexts/AuthContext';
import { Icon } from '@ant-design/react-native';

const HeaderRight = () => {
  const { onLogout } = UseAuth();

  return <Icon name="logout" size="md" onPress={onLogout} />;
};

export default HeaderRight;
