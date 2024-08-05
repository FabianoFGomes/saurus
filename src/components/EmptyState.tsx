import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Result, View } from '@ant-design/react-native';

interface EmptyStateProps {
  message?: string;
}

function EmptyState(props: EmptyStateProps) {
  const { message } = props;
  return (
    <View style={styles.container}>
      <Result
        img={<Icon name="exclamation-circle" size={50} />}
        title={message || 'Not found!'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EmptyState;
