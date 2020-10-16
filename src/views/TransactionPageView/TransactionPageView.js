import React, { useRef, useEffect, useState } from 'react';
import { db } from 'firebase/fire';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faWallet, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { fireStoreFetch } from 'components/utils/fireStoreFetch';

import {
  StyledWrapper,
  StyledHeader,
  StyledIcon,
  StyledTableWrapper,
  StyledHeaderTitle,
  StyledNav,
  StyledBootstrapTable,
  SearchWrapper,
  StyledSearch,
} from './TransactionPageView.css.js';
import { columns } from 'data/columnBoostrapTable';

const getData = () => {
  let today = new Date().toLocaleDateString();
  return today;
};

const TransactionPageView = ({ userID }) => {
  const [transactionsList, setTransactionsList] = useState();
  const [bilans, setBilans] = useState(0);
  const [currency, setCurrency] = useState(0);

  const countIncomeExpenses = (transactions) => {
    const result = transactions.reduce(
      (map, field) => {
        field.cash > 0 ? (map.incomeCounter += field.cash) : (map.expensesCounter += field.cash);

        return map;
      },
      { incomeCounter: 0, expensesCounter: 0 },
    );

    return result;
  };

  const data = useRef(getData());

  useEffect(() => {
    if (userID != null) {
      fireStoreFetch(userID).then(({ transactions, salary, currency }) => {
        setTransactionsList(transactions.reverse().slice(0, 5));
        setCurrency(currency);
        const { incomeCounter, expensesCounter } = countIncomeExpenses(transactions);
        setBilans(incomeCounter + expensesCounter + salary);
      });
    }
  }, [userID]);

  return (
    <>
      <StyledWrapper>
        <StyledHeader>
          <div>
            <StyledIcon icon={faCalendarDay} size="3x" />
            <p>{data.current}</p>
          </div>

          <div>
            <StyledIcon icon={faWallet} size="3x" />
            <p>
              {bilans}
              {currency}
            </p>
          </div>
        </StyledHeader>
        <StyledNav>
          <StyledHeaderTitle white>Last transactions</StyledHeaderTitle>
        </StyledNav>
        <StyledTableWrapper>
          {transactionsList ? (
            <ToolkitProvider keyField="id" data={transactionsList} columns={columns} search>
              {(props) => (
                <>
                  <SearchWrapper>
                    {' '}
                    <StyledSearch placeholder="Title transaction" {...props.searchProps} />
                  </SearchWrapper>

                  <hr />

                  <StyledBootstrapTable {...props.baseProps} />
                  {transactionsList.length === 0 ? <p>Add first transaction</p> : null}
                </>
              )}
            </ToolkitProvider>
          ) : (
            <p>Loading...</p>
          )}
        </StyledTableWrapper>
      </StyledWrapper>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userID: state.User.uid,
  };
};

export default connect(mapStateToProps, null)(TransactionPageView);
