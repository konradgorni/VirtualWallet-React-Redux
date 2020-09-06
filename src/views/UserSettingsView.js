import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { db } from 'firebase/fire';
import { useHistory } from 'react-router-dom';
import HeaderText from 'components/atoms/HeaderText';
import { Input, StyledErrorMessage } from 'components/atoms/FormikComponents';
import Button from 'components/atoms/Button';
import { device } from 'theme/breakpoints';

const StyledWrapper = styled.div`
  width: 85vw;
  height: 100vh;
  margin-left: 15vw;
  background-color: ${({ theme }) => theme.color2};
`;

const StyledForm = styled(Form)`
  display: flex;
  height: 35vh;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledSelect = styled.select`
  width: 300px;
  height: 60px;
  @media ${device.mobileS} {
    width: 100%;
  }
`;

const StyledHeader = styled(HeaderText)`
  text-align: center;
  padding: 5% 0;
  color: white;
  @media ${device.mobileS} {
    font-size: 35px;
  }
`;

const StyledButton = styled(Button)`
  @media ${device.mobileS} {
    width: 100%;
  }
`;

const StyledInput = styled(Input)`
  @media ${device.mobileS} {
    width: 100%;
  }
`;

const UserSettingsView = ({ userId }) => {
  const [currency, setCurrency] = useState('PLN');
  let history = useHistory();

  const budget = (salary) => {
    const docRef = db.collection('users').doc(userId);

    docRef
      .get()
      .then(function (doc) {
        let nextPaymentDate = new Date();
        nextPaymentDate.setDate(nextPaymentDate.getDate() + 30);
        const nextPaymentDateFormatting = nextPaymentDate.toLocaleDateString();
        if (doc.exists) {
          db.collection('users').doc(userId).update({
            salary: salary,
            currency: currency,
            nextPaymentDate: nextPaymentDateFormatting,
          });
          return history.push('/authpagehome/stats');
        } else {
          db.collection('users').doc(userId).set({
            salary,
            currency,
            nextPaymentDate: nextPaymentDateFormatting,
            emptyTransactions: true,
          });
          return history.push('/authpagehome/stats');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  };

  return (
    <StyledWrapper>
      <StyledHeader>Configure your wallet</StyledHeader>
      <Formik
        initialValues={{ salary: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.salary) {
            errors.salary = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          budget(values.salary);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <StyledInput placeholder="Your month salary" type="number" name="salary" />
            <StyledErrorMessage name="salary" component="div" />
            <StyledSelect value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <optgroup label="Currency">
                <option value="PLN">PLN</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="USD">USD</option>
                <option value="CHF">CHF</option>
              </optgroup>
            </StyledSelect>
            <StyledButton type="submit">Save</StyledButton>
          </StyledForm>
        )}
      </Formik>
    </StyledWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.User.uid,
  };
};

export default connect(mapStateToProps, null)(UserSettingsView);
