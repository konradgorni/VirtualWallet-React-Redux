import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { setWallet } from 'data/actions/setWallet';
import HeaderText from 'components/atoms/HeaderText';
import { StyledInput, StyledErrorMessage } from 'components/atoms/FormikComponents';
import Button from 'components/atoms/Button';

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
`;

const StyledHeader = styled(HeaderText)`
  text-align: center;
  padding: 5% 0;
  color: white;
`;

const UserSettingsView = ({ setWallet }) => {
  const [currency, setCurrency] = useState('PLN');

  const budget = (salary) => {
    setWallet(salary, currency);
    console.log(salary);
    console.log(currency);
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
            <Button type="submit">Save</Button>
          </StyledForm>
        )}
      </Formik>
    </StyledWrapper>
  );
};

const mapDispatchToProps = {
  setWallet,
};

export default connect(null, mapDispatchToProps)(UserSettingsView);
