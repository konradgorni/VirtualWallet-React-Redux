import React from 'react';
import styled from 'styled-components';
import Sidebar from 'components/organic/Sidebar';

const StyledWrapper = styled.div`
  width: 85vw;
  height: 100vh;
  margin-left: 15vw;
  background-color: red;
`;

const TransactionPageView = () => {
  return (
    <>
      <Sidebar />
      <StyledWrapper>
        <h2>tekst</h2>
      </StyledWrapper>
    </>
  );
};

export default TransactionPageView;
