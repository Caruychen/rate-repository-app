import { Formik } from 'formik';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from '../Text';

import theme from '../../theme';
import useCreateReview from '../../hooks/useCreateReview';
import { useHistory } from 'react-router';
import useErrorMessage from '../../hooks/useErrorMessage';

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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating can only contain numeric values')
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
});

const ReviewForm = ({ onSubmit, error }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" style={styles.formInputs} />
      <FormikTextInput name="repositoryName" placeholder="Repository name" style={styles.formInputs} />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" style={styles.formInputs} numeric />
      <FormikTextInput name="text" placeholder="Review" style={styles.formInputs} multiline />
      <Pressable testID="submitButton" onPress={onSubmit}>
        <Text buttonStyle="primary" style={styles.submit}>Create a review</Text>
      </Pressable>
      {error &&
        <Text style={styles.errorText}>{error}</Text>
      }
    </View>
  );
};

const Review = () => {
  const [createReview] = useCreateReview();
  const [errorMessage, setMessageTimeout] = useErrorMessage();
  const history = useHistory();

  const onSubmit = async values => {
    try {
      const data = await createReview({ ...values, rating: parseInt(values.rating) });
      history.push(`/repository/${data.createReview.repositoryId}`);
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
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} error={errorMessage} />}
    </Formik>
  );
};

export default Review;