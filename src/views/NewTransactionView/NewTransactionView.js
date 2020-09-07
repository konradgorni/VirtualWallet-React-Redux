import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { db } from 'firebase/fire';
import { Formik, Field } from 'formik';
import { StyledErrorMessage } from 'components/atoms/FormikComponents';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  StyledWrapper,
  StyledForm,
  StyledSelect,
  StyledHeader,
  StyledButton,
  StyledInput,
} from './NewTransactionView.css';

const NewTrasactionView = ({ userId }) => {
  const genereteRandomID = () => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

  const notify = (type) => {
    if (type === 'success') {
      toast.success('Transaction added!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (type === 'payment') {
      toast.info('Montly Payment Added!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error('Something went wrong :<', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const add = (title, cash, type, paymentAdded) => {
    const docRef = db.collection('users').doc(userId);
    let montlyPayment = paymentAdded;
    const date = new Date().toLocaleDateString();
    const data = {
      title,
      cash,
      date,
      type,
      id: genereteRandomID(),
    };

    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          if (montlyPayment === true) {
            let nextPaymentDate = new Date();
            nextPaymentDate.setDate(nextPaymentDate.getDate() + 30);
            const nextPaymentDateFormatting = nextPaymentDate.toLocaleDateString();

            db.collection('users')
              .doc(userId)
              .update({
                transactions: firebase.firestore.FieldValue.arrayUnion(data),
                nextPaymentDate: nextPaymentDateFormatting,
              });
            notify('payment');
          } else if (montlyPayment === false) {
            db.collection('users')
              .doc(userId)
              .update({
                transactions: firebase.firestore.FieldValue.arrayUnion(data),
                emptyTransactions: false,
              });
            notify('success');
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const nextPaymentChecker = (payDate, salary) => {
    let nextPaymentDate = new Date().toLocaleDateString();
    const currentDay = nextPaymentDate.substr(0, 1);
    const currentMonth = nextPaymentDate.substr(2, 2);

    const payDateDay = payDate.substr(0, 1);
    const payDateMonth = payDate.substr(2, 2);

    const salaryy = salary * 1;

    if (currentDay === payDateDay && currentMonth === payDateMonth) {
      add('Montly Payment', salaryy, 'INCOME', true);
    }
  };

  const idUser = userId;
  useEffect(() => {
    if (idUser != null) {
      const docRef = db.collection('users').doc(idUser);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            nextPaymentChecker(doc.data().nextPaymentDate, doc.data().salary);
          } else {
            console.log('No such document!');
          }
        })
        .catch(function (error) {
          console.log('Error getting document:', error);
        });
    }
  }, [idUser]);

  return (
    <>
      <StyledWrapper>
        <StyledHeader>Add new transaction</StyledHeader>
        <Formik
          initialValues={{ title: '', cash: '', type: 'INCOME' }}
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
            console.log(values);
            add(values.title, values.cash, values.type, false);
            resetForm({ title: '', cash: 0, type: '' });
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <StyledForm>
              <StyledInput placeholder="Title transaction" type="text" name="title" />
              <StyledErrorMessage name="title" component="div" />
              <StyledInput placeholder="Costs with sign -" type="number" name="cash" />
              <StyledErrorMessage name="cash" component="div" />
              <Field name="type" as={StyledSelect}>
                <option value="INCOME">INCOME</option>
                <option value="BILLS">BILLS</option>
                <option value="FOOD">FOOD</option>
                <option value="ENTERTAINMENT">ENTERTAINMENT</option>
                <option value="CAR">CAR</option>
                <option value="UNEXPECTED">UNEXPECTED EXPENSES</option>
                <option value="OTHER">OTHER</option>
              </Field>
              <StyledButton onClick={add} type="submit">
                Add
              </StyledButton>
              <ToastContainer />
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
