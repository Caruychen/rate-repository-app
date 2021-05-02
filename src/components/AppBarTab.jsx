import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
});

const AppBarTab = ({ text }) => {
  return (
    <Pressable style={styles.container} onPress={() => console.log(`pressed ${text}`)}>
      <Text color="white" fontSize="subheading" fontWeight="bold">
        {text}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;