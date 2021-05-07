import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './Forms/SignIn';
import RepositoryView from './RepositoryView';
import Review from './Forms/Review';
import SignUp from './Forms/SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.backgroundPrimary
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/repository/:id" exact>
          <RepositoryView />
        </Route>
        <Route path="/review" exact>
          <Review />
        </Route>
        <Route path="/myreviews" exact>
          <MyReviews />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;