import React from 'react';
import { Button as NativeButton, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    color:'white',
    padding: 5,
    borderRadius: 5
  }
});

const Button = ({ ...props }) => {
  const buttonStyle = [
    styles.button
  ];
  return <NativeButton title={props.children} styles={buttonStyle} {...props} />;
};

export default Button;