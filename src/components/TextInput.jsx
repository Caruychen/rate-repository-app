import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    borderColor: theme.colors.borderGray,
    borderWidth: 1,
    borderRadius: 3,
    padding: 15,
    fontSize: theme.fontSizes.subheading
  },
  inputError: {
    borderColor: theme.colors.error
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, style, error && styles.inputError];
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;