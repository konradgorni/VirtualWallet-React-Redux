import React, { useState } from 'react';
import Button from 'components/atoms/Button';
import fire from '../../firebase/fire';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import {
  StyledWrapper,
  StyledContent,
  StyledForm,
  StyledIncorrectMessage,
  StyledHeader,
  StyledInput,
  ErrorMessage,
} from './RegisterPageView.css.js';

const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
const emailRegex = new RegExp('/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i');

const RegisterPageView = () => {
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);
  let history = useHistory();

  const singup = (email, password) => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        return history.push('/authpagehome/settings');
      })
      .catch((err) => {
        console.log(err);
        setIsErrorMessageVisible(true);
        setTimeout(() => {
          setIsErrorMessageVisible(false);
        }, 4000);
      });
  };

  return (
    <StyledWrapper>
      <StyledContent>
        <StyledHeader>VirtualWallet</StyledHeader>
        <Formik
          initialValues={{ email: '', password: '', password2: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (!emailRegex.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Required';
            } else if (!passwordRegex.test(values.password)) {
              errors.password =
                'Minimum eight characters, at least one letter, one number and one special character:';
            }

            if (!values.password2) {
              errors.password2 = 'Required';
            } else if (values.password2 !== values.password) {
              errors.password2 = 'The passwords are not the same';
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            singup(values.email, values.password);
            resetForm();
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <StyledForm>
              {isErrorMessageVisible ? (
                <StyledIncorrectMessage>
                  Email or Password is invalid.Try again
                </StyledIncorrectMessage>
              ) : null}
              <StyledInput placeholder="E-mail" type="email" name="email" />
              <ErrorMessage name="email" component="div" />
              <StyledInput placeholder="password" type="password" name="password" />
              <ErrorMessage name="password" component="div" />
              <StyledInput placeholder="Repeat password" type="password" name="password2" />
              <ErrorMessage name="password2" component="div" />
              <Button type="submit">Register</Button>
            </StyledForm>
          )}
        </Formik>
      </StyledContent>
    </StyledWrapper>
  );
};

export default RegisterPageView;
