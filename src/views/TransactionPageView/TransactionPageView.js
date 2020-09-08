import React, { useRef, useEffect, useState } from 'react';
import { db } from 'firebase/fire';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faWallet, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

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
  const [transactions, setTransactions] = useState();
  const [bilans, setBilans] = useState(0);
  const [currency, setCurrency] = useState(0);
  const [products, setProducts] = useState([]);

  const data = useRef(getData());
  const idUser = userID;
  useEffect(() => {
    if (idUser != null) {
      const docRef = db.collection('users').doc(idUser);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            const transactions = doc.data().transactions;
            const salary = doc.data().salary;

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
            }, []);

            setTransactions(transactions);
            setBilans(incomeCounter + expensesCounter + salary);
            setCurrency(doc.data().currency);
          } else {
            console.log('No such document!');
          }
        })
        .catch(function (error) {
          console.log('Error getting document:', error);
        });
    }
  }, [idUser]);

  {
    if (transactions) {
      transactions
        .reverse()
        .map((transaction) => setProducts((prevArray) => [...prevArray, transaction]));
    }
  }

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
          <StyledHeaderTitle white>Last ons</StyledHeaderTitle>
        </StyledNav>
        <StyledTableWrapper>
          <ToolkitProvider keyField="id" data={products} columns={columns} search>
            {(props) => (
              <>
                <SearchWrapper>
                  {' '}
                  <StyledSearch placeholder="Title transaction" {...props.searchProps} />
                </SearchWrapper>

                <hr />
                <StyledBootstrapTable {...props.baseProps} />
              </>
            )}
          </ToolkitProvider>
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
