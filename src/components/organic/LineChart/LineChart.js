import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { db } from 'firebase/fire';
import { connect } from 'react-redux';
import HeaderText from 'components/atoms/HeaderText';
import { StyledWrapper, StyledHeaderText } from './LineChart.css';
import { Spiner } from 'components/utils/Spiner';
import { fireStoreFetch } from 'components/utils/fireStoreFetch';

const LineChart = ({ userID }) => {
  const [types, setTypes] = useState({});
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [emptyTransactions, setEmptyTransactions] = useState(true);
  const [Loader, setLoader] = useState(true);
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);

  useEffect(() => {
    if (userID !== null) {
      fireStoreFetch(userID).then((response) => {
        const transactions = response.transactions;
        const empty = response.emptyTransactions;

        if (empty !== undefined) {
          setEmptyTransactions(response.emptyTransactions);
          setLoader(false);
        }
        if (empty === false) {
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
        }
      });
    }
  });

  const labelsList = [];
  const typesTransactions = [];
  if (types !== []) {
    for (let key in types) {
      labelsList.push(key);
    }
    for (let k in types) {
      var value = types[k];
      typesTransactions.push(value);
    }
  }

  const typeTransactions = {
    labels: labelsList,
    datasets: [
      {
        data: typesTransactions,
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

  const changeLoadingVisible = () => {
    setIsLoadingVisible(true);
  };

  return (
    <>
      <StyledWrapper>
        {Loader ? (
          <Spiner isLoadingVisible changeLoadingVisible={changeLoadingVisible} />
        ) : emptyTransactions ? (
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
