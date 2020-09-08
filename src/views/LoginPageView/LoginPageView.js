import React, { useState } from 'react';
import { auth } from '../../firebase/fire';
import { Formik } from 'formik';
import { StyledErrorMessage } from 'components/atoms/FormikComponents';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeAuth } from 'data/actions/changeAuth';
import {
  StyledWrapper,
  StyledContent,
  StyledForm,
  StyledInput,
  StyledButton,
  StyledIncorrectMessage,
  StyledHeader,
} from './LoginPageView.css';

const LoginPageView = ({ changeAuth }) => {
  const [isHide, setIsHide] = useState(false);
  const history = useHistory();

  const login = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((u) => {
        changeAuth();
        return history.push('/authpagehome/stats');
      })
      .catch((err) => {
        setIsHide(true);
        setTimeout(() => {
          setIsHide(false);
        }, 4000);
      });
  };

  return (
    <StyledWrapper>
      <StyledContent>
        <StyledHeader>VirtualWallet</StyledHeader>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            login(values.email, values.password);
            resetForm();
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <StyledForm>
              {isHide ? (
                <StyledIncorrectMessage>
                  Email or Password is invalid.Try again
                </StyledIncorrectMessage>
              ) : null}
              <StyledInput placeholder="Login" type="email" name="email" />
              <StyledErrorMessage name="email" component="div" />
              <StyledInput placeholder="password" type="password" name="password" />
              <StyledErrorMessage name="password" component="div" />
              <StyledButton type="submit">Login</StyledButton>
            </StyledForm>
          )}
        </Formik>
      </StyledContent>
    </StyledWrapper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAuth: () => dispatch(changeAuth()),
  };
};

export default connect(null, mapDispatchToProps)(LoginPageView);
