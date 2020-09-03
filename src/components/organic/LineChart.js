import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { db } from 'firebase/fire';
import { connect } from 'react-redux';
import styled from 'styled-components';
import HeaderText from 'components/atoms/HeaderText';
import { device } from 'theme/breakpoints';

const LineChart = ({ userID }) => {
  const [types, setTypes] = useState();
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [width, setWidth] = useState();
  const [activeStats, setActiveStats] = useState(false);

  const StyledWrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
  const StyledHeaderText = styled(HeaderText)`
    text-align: center;
    padding: 5% 0;
    @media ${device.laptop} {
      font-size: 35px;
    }
    @media ${device.tablet} {
      font-size: 32px;
    }
  `;
  const idUser = userID;
  useEffect(() => {
    if (idUser != null) {
      const docRef = db.collection('users').doc(idUser);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            const transactions = doc.data().transactions;
            if (transactions !== undefined) {
              setActiveStats(true);
            }
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

              return null;
            });
            setExpenses(expensesCounter);
            setIncome(incomeCounter);

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
  const tran = [];
  const mroko = [];
  if (types !== []) {
    for (var key in types) {
      tran.push(key);
    }
    for (var key in types) {
      var value = types[key];
      mroko.push(value);
    }
  }

  const typeTransactions = {
    labels: tran,
    datasets: [
      {
        data: mroko,
        backgroundColor: ['red', 'blue', 'yellow', 'green', 'pink', 'orange', 'dark'],
      },
    ],
    legend: {
      display: false,
    },
  };
  const bilans = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [income, expenses],
        backgroundColor: ['red', 'blue', 'yellow', 'green', 'pink', 'orange', 'dark'],
      },
    ],
    legend: {
      display: false,
    },
  };
  const options = {
    title: {
      display: false,
      text: 'Type of your transactions',
      maintainAspectRatio: false,
    },
  };

  return (
    <>
      <StyledWrapper>
        {activeStats === false ? (
          <HeaderText white>Add your first transaction if you want see stats.</HeaderText>
        ) : (
          <>
            <StyledHeaderText white>Your income vs expenses</StyledHeaderText>
            <Doughnut data={bilans} options={options} />
            <StyledHeaderText white>Type of your transactions</StyledHeaderText>

            <Doughnut data={typeTransactions} options={options} />
          </>
        )}
      </StyledWrapper>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userID: state.User.uid,
  };
};

export default connect(mapStateToProps, null)(LineChart);
