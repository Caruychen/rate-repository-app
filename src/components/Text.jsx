import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  headerPrimary: {
    color: theme.colors.headerPrimary
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 5,
    borderRadius: 3,
    overflow: 'hidden'
  }
});

const Text = ({ color, fontSize, fontWeight, buttonStyle, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color == 'white' && styles.headerPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    buttonStyle === 'primary' && styles.buttonPrimary,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;