import React, { useState } from 'react';
import styled from 'styled-components';
import HeaderText from 'components/atoms/HeaderText';
import Button from 'components/atoms/Button';
import fire from '../firebase/fire';
import { Formik, Form } from 'formik';
import { StyledInput, StyledErrorMessage } from 'components/atoms/FormikComponents';
import { useHistory } from 'react-router-dom';
import { device } from 'theme/breakpoints';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.bgc};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledContent = styled.div`
  width: 40vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 45vh;

  align-content: space-between;
`;

const StyledIncorrectMessage = styled.p`
  color: red;
  font-size: 20px;
  text-decoration: underline;
`;
const StyledHeader = styled(HeaderText)`
  @media ${device.mobileM} {
    font-size: 40px;
  }
`;

const Input = styled(StyledInput)`
  @media ${device.mobileM} {
    width: 250px;
    margin: 0 auto;
  }
`;
const ErrorMessage = styled(StyledErrorMessage)`
  @media ${device.mobileM} {
    margin: 0 auto;
  }
`;
const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
const RegisterPageView = () => {
  const [hide, setHide] = useState(false);
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
        setHide(true);
        setTimeout(() => {
          setHide(false);
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
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Required';
            } else if (!strongRegex.test(values.password)) {
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
              {hide ? (
                <StyledIncorrectMessage>
                  Email or Password is invalid.Try again
                </StyledIncorrectMessage>
              ) : null}
              <Input placeholder="E-mail" type="email" name="email" />
              <ErrorMessage name="email" component="div" />
              <Input placeholder="password" type="password" name="password" />
              <ErrorMessage name="password" component="div" />
              <Input placeholder="Repeat password" type="password" name="password2" />
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
