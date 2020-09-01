import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from 'firebase/fire';
import { connect } from 'react-redux';
import { device } from 'theme/breakpoints';
import PropTypes from 'prop-types';

const StatisticPageView = ({ userID }) => {
  const [type, setTypes] = useState();
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const bilans = [];
  const listTypeTransactions = [];

  const StyledWrapper = styled.div`
    width: 85vw;
    margin-left: 15vw;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.color2};
    overflow-x: hidden;
  `;
  const StyledText = styled.p`
    font-size: 45px;
    color: white;
    text-align: center;
    font-weight: bold;
  `;

  const idUser = userID;
  useEffect(() => {
    if (idUser != null) {
      const docRef = db.collection('users').doc(idUser);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            const { transactions } = doc.data().transactions;
            const transactionsType = {
              INCOME: 0,
              BILLS: 0,
              FOOD: 0,
              OTHER: 0,
              CAR: 0,
              UNEXPECTED: 0,
              ENTERTAINMENT: 0,
            };
            transactions.map((transaction) => {
              const typeTr = transaction.type;
              transactionsType[typeTr] += +1;
              return null;
            });
            let incomeCounter = 0;
            let expensesCounter = 0;
            transactions.map((transaction) => {
              const cashSymbol = transaction.cash;
              if (cashSymbol > 0) {
                incomeCounter += cashSymbol;
              } else if (cashSymbol < 0) {
                expensesCounter += cashSymbol;
              }
              setExpenses(expensesCounter);
              setIncome(incomeCounter);
              return null;
            });

            setTypes(transactionsType);
          } else {
            alert('No found user data.');
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [idUser]);

  if (type !== undefined) {
    const data = type;

    for (let i = 0; i < 7; i++) {
      const name = Object.keys(data)[i];
      const value = Object.values(data)[i];
      if (value !== 0) {
        listTypeTransactions.push({ angle: value, radius: 10, label: name });
      }
    }
  }

  if (expenses && income !== 0) {
    const incomeLocal = income;
    let expensesLocal = expenses;
    expensesLocal *= -1;

    bilans.push(
      { angle: incomeLocal, radius: 10, label: 'Income' },
      { angle: expensesLocal, radius: 10, label: 'Expenses' },
    );
  }

  return (
    <>
      <StyledWrapper>
        <StyledText>Twoje wydatki</StyledText>
        <StyledText>Na co wypadjesz</StyledText>
      </StyledWrapper>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userID: state.User.uid,
  };
};

StatisticPageView.propTypes = {
  userID: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(StatisticPageView);
