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

  const countStatistic = (tran) => {
    const result = tran.reduce(
      (map, field) => {
        if (!map[field.type]) {
          map.transactionList[field.type] = 1;
        } else {
          map.transactionList[field.type]++;
        }
        field.cash > 0 ? map.income++ : map.expenses++;
        return map;
      },
      {
        income: 0,
        expenses: 0,
        transactionList: {
          INCOME: 0,
          BILLS: 0,
          FOOD: 0,
          OTHER: 0,
          CAR: 0,
          UNEXPECTED: 0,
          ENTERTAINMENT: 0,
        },
      },
    );
    return result;
  };

  useEffect(() => {
    if (userID !== null) {
      fireStoreFetch(userID).then(({ transactions, emptyTransactions }) => {
        setEmptyTransactions(emptyTransactions);
        setLoader(false);
        if (transactions.length) {
          const { income, expenses, transactionList } = countStatistic(transactions);
          setExpenses(expenses);
          setIncome(income);
          setTypes(transactionList);
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
