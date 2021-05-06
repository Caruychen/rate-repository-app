import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  button: {
    padding: 20
  },
  buttonText: {
    textAlign: 'center'
  }
});

const ModalButton = ({ setModalVisible , label }) => {
  return (
    <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
      <Text fontWeight="bold" fontSize="subheading" style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
};

export default ModalButton;