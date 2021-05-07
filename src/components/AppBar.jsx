import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import SignOutTab from './SignOutTab';
import theme from '../theme';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    backgroundColor: theme.colors.backgroundDark
  },
});

const AppBar = () => {
  const { authorizedUser } = useAuthorizedUser();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" path="/" />
        {
          authorizedUser
            ?
            <>
              <AppBarTab text="Create a review" path="/review" />
              <AppBarTab text="My reviews" path="/myreviews"/>
              <SignOutTab />
            </>
            :
            <>
              <AppBarTab text="Sign in" path="/signin" />
              <AppBarTab text="Sign up" path="/signup" />
            </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;