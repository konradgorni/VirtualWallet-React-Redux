import React from 'react';
import styled from 'styled-components';
import Sidebar from 'components/organic/Sidebar';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { db } from 'firebase/fire';
import { Formik, Form } from 'formik';
import { StyledInput, StyledErrorMessage } from 'components/atoms/FormikComponents';
import Button from 'components/atoms/Button';
import HeaderText from 'components/atoms/HeaderText';

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

const StyledHeader = styled(HeaderText)`
  text-align: center;
  padding: 5% 0;
  color: white;
`;

const NewTrasactionView = ({ addTransaction, userId }) => {
  const add = (title, cash) => {
    const docRef = db.collection('users').doc(userId);
    let data = {
      title: title,
      cash: cash,
      date: new Date().toLocaleDateString(),
    };

    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          db.collection('users')
            .doc(userId)
            .update({
              transactions: firebase.firestore.FieldValue.arrayUnion(data),
            });
        } else {
          db.collection('users')
            .doc(userId)
            .set({ transactions: [{ title: title, cash: cash }] });
        }
      })
      .catch(function (error) {
        // console.log('Error getting document:', error);
      });
  };

  return (
    <>
      <Sidebar />
      <StyledWrapper>
        <StyledHeader>Add new transaction</StyledHeader>
        <Formik
          initialValues={{ title: '', cash: 0 }}
          validate={(values) => {
            const errors = {};
            if (values.title === '') {
              errors.title = 'Required';
            } else if (!values.title > 5) {
              errors.title = 'Min length 5 characters';
            }
            if (values.cash == null) {
              errors.cash = 'Required';
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            add(values.title, values.cash);
            resetForm();
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <StyledForm>
              <StyledInput placeholder="Title transaction" type="text" name="title" />
              <StyledErrorMessage name="title" component="div" />
              <StyledInput placeholder="Money" type="number" name="cash" />
              <StyledErrorMessage name="cash" component="div" />
              <Button onClick={add} type="submit">
                ADD
              </Button>
            </StyledForm>
          )}
        </Formik>
      </StyledWrapper>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.User.uid,
  };
};

export default connect(mapStateToProps, null)(NewTrasactionView);
