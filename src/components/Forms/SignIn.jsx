import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../../theme';
import FormikTextInput from './FormikTextInput';
import Text from '../Text';
import useSignIn from '../../hooks/useSignIn';
import { useHistory } from 'react-router';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  formInputs: {
    marginTop: 20
  },
  submit: {
    marginVertical: 20,
    padding: 15,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold
  }
});

const initialValues = {
  username: '',
  password: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username should be at least 3 characters long'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password should be at least 6 characters long')
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput testID="usernameField" name="username" placeholder="Username" style={styles.formInputs} />
      <FormikTextInput testID="passwordField" name="password" placeholder="Password" style={styles.formInputs} secureTextEntry />
      <Pressable testID="submitButton" onPress={onSubmit}>
        <Text buttonStyle="primary" style={styles.submit}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
  </Formik>
);

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async values => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;