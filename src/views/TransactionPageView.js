import React, { useRef, useEffect, useState } from 'react';
import { db } from 'firebase/fire';
import styled from 'styled-components';
import Sidebar from 'components/organic/Sidebar';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import HeaderText from 'components/atoms/HeaderText';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const StyledWrapper = styled.div`
  width: 85vw;
  height: 100vh;
  margin-left: 15vw;
  background-color: ${({ theme }) => theme.color2};
  overflow-x: hidden;
`;

const StyledHeader = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: center;

  div {
    height: 100%;
    display: flex;
    align-items: center;

    p {
      display: block;
      height: 30px;
      line-height: 30px;
      margin: 0;
      padding: 0;
    }
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  transition: 0.5s ease-in-out;
  display: block;
  height: 30px;
`;

const StyledTableWrapper = styled.div`
  width: 100%;
  margin-top: 5vh;
  height: 85vh;
`;

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
    width: 300px;
    height: 50px;
  `;

  const products = [];

  const data = useRef(getData());
  let idUser = userID;
  useEffect(() => {
    if (idUser != null) {
      const docRef = db.collection('users').doc(idUser);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setTransactions(doc.data().transactions);
            setBilans(doc.data().bilans);
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
    },
    {
      dataField: 'title',
      text: 'Title',
    },
    {
      dataField: 'cash',
      text: 'Money',
    },
    {
      dataField: 'type',
      text: 'Type',
    },
    {
      dataField: 'date',
      text: 'Date',
    },
  ];

  {
    if (transactions) {
      transactions.reverse().map((transaction) => products.push(transaction));
      console.log(products);
    }
  }

  return (
    <>
      <Sidebar />
      <StyledWrapper>
        <StyledHeader>
          <div>
            <StyledIcon icon={faCalendarDay} size="3x" />
            <p>{data.current}</p>
          </div>
          <div>
            <HeaderText white>Last transactions</HeaderText>
          </div>
          <div>
            <StyledIcon icon={faWallet} size="3x" />
            <p>
              {bilans}
              {currency}
            </p>
          </div>
        </StyledHeader>
        <StyledTableWrapper>
          <ToolkitProvider keyField="id" data={products} columns={columns} search>
            {(props) => (
              <div>
                <StyledSearch placeholder="Title transaction" {...props.searchProps} />
                <hr />
                <BootstrapTable {...props.baseProps} />
              </div>
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
