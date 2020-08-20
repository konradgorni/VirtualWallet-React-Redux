import React, { useRef, useEffect, useState } from 'react';
import { db } from 'firebase/fire';
import styled from 'styled-components';
import Sidebar from 'components/organic/Sidebar';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

const StyledWrapper = styled.div`
  width: 85vw;
  height: 200vh;
  margin-left: 15vw;
  background-color: ${({ theme }) => theme.color2};
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
      background-color: yellow;
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
  background-color: green;
  height: 30px;
  :hover {
    color: ${({ theme }) => theme.color1};
  }
`;
const getData = () => {
  let today = new Date().toLocaleDateString();
  return today;
};

const TransactionPageView = ({ bilans, userID }) => {
  const [transaction, useTransaction] = useState();

  const data = useRef(getData());
  let idUser = userID;
  useEffect(() => {
    if (idUser != null) {
      const docRef = db.collection('users').doc(idUser);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log('Document data:', doc.data());
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
      <Sidebar />
      <StyledWrapper>
        <StyledHeader>
          <div>
            <p>{data.current}</p>
          </div>
          <div>
            {' '}
            <h1>Last Transactions</h1>
          </div>
          <div>
            <StyledIcon icon={faWallet} size="3x" color="#f69e7b" />
            <p>{bilans}$</p>
          </div>
        </StyledHeader>
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody></tbody>
        </Table>
      </StyledWrapper>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    bilans: state.Wallet.bilans,
    userID: state.User.uid,
  };
};

export default connect(mapStateToProps, null)(TransactionPageView);
