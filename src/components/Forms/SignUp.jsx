import { Formik } from 'formik';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';

import theme from '../../theme';
import Text from '../Text';
import useSignUp from '../../hooks/useSignUp';
import useErrorMessage from '../../hooks/useErrorMessage';
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
  },
  errorText: {
    marginTop: 5,
    color: theme.colors.error
  }
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(1, 'Too short, must be at least 1 character')
    .max(30, 'Too long, must be at most 30 characters long'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Too short, must be at least 5 characters long')
    .max(50, 'Too long, msut be at most 50 characters long'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Password confirm is required')
    .min(5, 'Too short, must be at least 5 characters long')
    .max(50, 'Too long, msut be at most 50 characters long'),
});

const SignUpForm = ({ onSubmit, error }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" style={styles.formInputs} />
      <FormikTextInput name="password" placeholder="Password" style={styles.formInputs} secureTextEntry />
      <FormikTextInput name="passwordConfirm" placeholder="Password confirmation"
        style={styles.formInputs} secureTextEntry />
      <Pressable testID="submitButton" onPress={onSubmit}>
        <Text buttonStyle="primary" style={styles.submit}>Sign up</Text>
      </Pressable>
      {error &&
        <Text style={styles.errorText}>{error}</Text>
      }
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const history = useHistory();
  const [errorMessage, setMessageTimeout] = useErrorMessage();

  const onSubmit = async ({ username, password }) => {
    try {
      await signUp({ username, password });
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      setMessageTimeout(e.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} error={errorMessage} />}
    </Formik>
  );
};

export default SignUp;