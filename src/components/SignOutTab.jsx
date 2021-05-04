import { useApolloClient } from '@apollo/client';
import React from 'react';
import { Pressable, StyleSheet } from "react-native";
import useAuthStorage from '../hooks/useAuthStorage';
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
});

const SignOutTab = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <Pressable onPress={handleSignOut}>
      <Text style={styles.container} color="white" fontSize="subheading" fontWeight="bold">Sign out</Text>
    </Pressable>
  );
};

export default SignOutTab;