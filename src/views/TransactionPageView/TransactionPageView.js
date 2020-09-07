import React, { useRef, useEffect, useState } from 'react';
import { db } from 'firebase/fire';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faWallet, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import styled from 'styled-components';
import { device } from 'theme/breakpoints';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {
  StyledWrapper,
  StyledHeader,
  StyledIcon,
  StyledTableWrapper,
  StyledHeaderTitle,
  StyledNav,
  StyledBootstrapTable,
  SearchWrapper,
} from './TransactionPageView.css.js';

const getData = () => {
  let today = new Date().toLocaleDateString();
  return today;
};

const TransactionPageView = ({ userID }) => {
  const [transactions, setTransactions] = useState();
  const [bilans, setBilans] = useState(0);
  const [currency, setCurrency] = useState(0);

  const { SearchBar } = Search;
  const StyledSearch = styled(SearchBar)`
    width: 350px;
    height: 80px;
    @media ${device.mobileX} {
      width: 85vw;
    }
  `;

  const products = [];

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
  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      style: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
    },
    {
      dataField: 'title',
      text: 'Title',
      style: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
    },
    {
      dataField: 'cash',
      text: 'Money',
      style: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
    },
    {
      dataField: 'type',
      text: 'Type',
      style: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
    },
    {
      dataField: 'date',
      text: 'Date',
      style: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
    },
  ];

  {
    if (transactions) {
      transactions.reverse().map((transaction) => products.push(transaction));
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
          <StyledHeaderTitle white>Last transactions</StyledHeaderTitle>
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
