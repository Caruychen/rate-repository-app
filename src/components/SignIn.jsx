import { Formik } from 'formik';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  formInputs: {
    marginHorizontal: 20,
    marginTop: 20
  },
  signIn: {
    margin: 20,
    padding: 15,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold
  }
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username"  style={styles.formInputs}/>
      <FormikTextInput name="password" placeholder="Password" style={styles.formInputs} secureTextEntry/>
      <Pressable onPress={onSubmit}>
        <Text buttonStyle="primary" style={styles.signIn}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const initialValues = {
    username: '',
    password: ''
  };
  const onSubmit = values => console.log(values);
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;