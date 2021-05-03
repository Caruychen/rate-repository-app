import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  formInputs: {
    marginTop: 20
  },
  signIn: {
    marginVertical: 20,
    padding: 15,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold
  }
});

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
    <Formik 
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;