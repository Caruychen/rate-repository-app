import React from 'react';
import { StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
});

const AppBarTab = ({ text, path }) => {
  return (
    <Link style={styles.container} to={path}>
      <Text color="white" fontSize="subheading" fontWeight="bold">
        {text}
      </Text>
    </Link>
  );
};

export default AppBarTab;