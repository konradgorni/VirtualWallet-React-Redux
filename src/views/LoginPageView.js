import React, { useState } from 'react';
import styled from 'styled-components';
import HeaderText from 'components/atoms/HeaderText';
import Button from 'components/atoms/Button';
import fire from '../firebase/fire';
import { Formik, Form } from 'formik';
import { StyledInput, StyledErrorMessage } from 'components/atoms/FormikComponents';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeAuth } from 'data/actions/changeAuth';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.bgc};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledContent = styled.div`
  width: 60%;
  height: 35vh;
  margin: 0px auto;
  justify-content: space-around;
  align-items: center;
  display: flex;
`;
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 25vh;
  align-content: space-between;
`;

const StyledIncorrectMessage = styled.p`
  color: red;
  font-size: 20px;
  text-decoration: underline;
`;

const LoginPageView = ({ changeAuth }) => {
  const [hide, setHide] = useState(false);
  let history = useHistory();

  const login = (email, password) => {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((u) => {
        console.log(u);
        changeAuth();
        return history.push('/authpagehome/stats');
      })
      .catch((err) => {
        setHide(true);
        console.log(err);
        setTimeout(() => {
          setHide(false);
        }, 4000);
      });
  };

  return (
    <StyledWrapper>
      <StyledContent>
        <HeaderText>VirtualWallet</HeaderText>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
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
              {hide ? (
                <StyledIncorrectMessage>
                  Email or Password is invalid.Try again
                </StyledIncorrectMessage>
              ) : null}
              <StyledInput placeholder="Login" type="email" name="email" />
              <StyledErrorMessage name="email" component="div" />
              <StyledInput placeholder="password" type="password" name="password" />
              <StyledErrorMessage name="password" component="div" />
              <Button type="submit">Login</Button>
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
