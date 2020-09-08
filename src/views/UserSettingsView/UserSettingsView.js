import React, { useState } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { db } from 'firebase/fire';
import { useHistory } from 'react-router-dom';
import { StyledErrorMessage } from 'components/atoms/FormikComponents';
import {
  StyledWrapper,
  StyledForm,
  StyledSelect,
  StyledHeader,
  StyledButton,
  StyledInput,
} from './UserSettingsView.css.js';

const UserSettingsView = ({ userId }) => {
  const [currency, setCurrency] = useState('PLN');
  const history = useHistory();

  const budget = (salary) => {
    const docRef = db.collection('users').doc(userId);

    docRef
      .get()
      .then((doc) => {
        const nextPaymentDate = new Date();
        nextPaymentDate.setDate(nextPaymentDate.getDate() + 30);
        const nextPaymentDateFormatting = nextPaymentDate.toLocaleDateString();
        if (doc.exists) {
          db.collection('users').doc(userId).update({
            salary,
            currency,
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
      // .then(function (doc) {
      //   const nextPaymentDate = new Date();
      //   nextPaymentDate.setDate(nextPaymentDate.getDate() + 30);
      //   const nextPaymentDateFormatting = nextPaymentDate.toLocaleDateString();
      //   if (doc.exists) {
      //     db.collection('users').doc(userId).update({
      //       salary,
      //       currency,
      //       nextPaymentDate: nextPaymentDateFormatting,
      //     });
      //     return history.push('/authpagehome/stats');
      //   } else {
      //     db.collection('users').doc(userId).set({
      //       salary,
      //       currency,
      //       nextPaymentDate: nextPaymentDateFormatting,
      //       emptyTransactions: true,
      //     });
      //     return history.push('/authpagehome/stats');
      //   }
      // })
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
