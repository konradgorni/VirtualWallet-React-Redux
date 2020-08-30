import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from 'components/organic/Sidebar';
import { db } from 'firebase/fire';
import { connect } from 'react-redux';
import { RadialChart } from 'react-vis';
import { device } from 'theme/breakpoints';

const StatisticPageView = ({ userID }) => {
  const [type, setTypes] = useState();
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [width, setWidth] = useState(500);
  let bilans = [];
  let listTypeTransactions = [];

  const StyledWrapper = styled.div`
    width: 85vw;
    height: 100vh;
    margin-left: 15vw;
  `;

  let idUser = userID;
  useEffect(() => {
    if (idUser != null) {
      const docRef = db.collection('users').doc(idUser);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            const transactions = doc.data().transactions;
            let transactionsType = {
              INCOME: 0,
              BILLS: 0,
              FOOD: 0,
              OTHER: 0,
              CAR: 0,
              UNEXPECTED: 0,
              ENTERTAINMENT: 0,
            };
            transactions.map((transaction) => {
              const type = transaction.type;
              transactionsType[type] = transactionsType[type] + 1;
            });
            let incomeCounter = 0;
            let expensesCounter = 0;
            transactions.map((transaction) => {
              const type = transaction.cash;
              if (type > 0) {
                incomeCounter = incomeCounter + type;
              } else if (type < 0) {
                expensesCounter = expensesCounter + type;
              }
              setExpenses(expensesCounter);
              setIncome(incomeCounter);
            });

            setTypes(transactionsType);
          } else {
            console.log('No such document!');
          }
        })
        .catch(function (error) {
          console.log('Error getting document:', error);
        });
    }
    let width = window.innerWidth;
    let sideBarSize = width * 0.15;
    width = width - sideBarSize;
    setWidth(window.innerWidth);
  }, [idUser]);

  if (type !== undefined) {
    const data = type;
    listTypeTransactions = [];
    for (let i = 0; i < 7; i++) {
      const name = Object.keys(data)[i];
      const value = Object.values(data)[i];
      if (value === 0) {
      } else {
        listTypeTransactions.push({ angle: value, radius: 10, label: name });
      }
    }
  } else {
  }
  if (expenses && income !== 0) {
    const incomeLocal = income;
    let expensesLocal = expenses;
    expensesLocal = expensesLocal * -1;

    bilans.push(
      { angle: incomeLocal, radius: 10, label: 'Income' },
      { angle: expensesLocal, radius: 10, label: 'Expenses' },
    );
  }
  console.log(window.innerWidth);

  return (
    <>
      <Sidebar />
      <StyledWrapper>
        <h2>STATISTICPAGEVIEW</h2>
        <RadialChart showLabels data={bilans} height={width} width={width} />
        <RadialChart showLabels data={listTypeTransactions} height={100} width={100} />
      </StyledWrapper>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userID: state.User.uid,
  };
};

export default connect(mapStateToProps, null)(StatisticPageView);
