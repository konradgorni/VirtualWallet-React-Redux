import React, { useState } from 'react';
import styled from 'styled-components';
import HeaderText from 'components/atoms/HeaderText';
import Button from 'components/atoms/Button';
import { auth } from '../firebase/fire';
import { Formik, Form } from 'formik';
import { Input, StyledErrorMessage } from 'components/atoms/FormikComponents';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeAuth } from 'data/actions/changeAuth';
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
  width: 50%;
  height: 35vh;
  margin: 0px auto;
  justify-content: space-around;
  align-items: center;
  display: flex;
  @media ${device.tablet} {
    flex-direction: column;
  }
`;
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 25vh;
  align-content: space-between;
`;

const StyledInput = styled(Input)`
  @media ${device.mobileM} {
    width: 250px;
    margin: 0 auto;
  }
`;
const StyledButton = styled(Button)`
  @media ${device.mobileM} {
    width: 250px;
    margin: 0 auto;
  }
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

const LoginPageView = ({ changeAuth }) => {
  const [hide, setHide] = useState(false);
  let history = useHistory();

  const login = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((u) => {
        changeAuth();
        return history.push('/authpagehome/stats');
      })
      .catch((err) => {
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
