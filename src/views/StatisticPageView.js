import React from 'react';
import styled from 'styled-components';
import Sidebar from 'components/organic/Sidebar';

const StyledWrapper = styled.div`
  width: 85vw;
  height: 100vh;
  margin-left: 15vw;
  background-color: red;
`;

const StatisticPageView = () => {
  return (
    <>
      <Sidebar />
      <StyledWrapper>
        <h2>STATISTICPAGEVIEW</h2>
      </StyledWrapper>
    </>
  );
};

export default StatisticPageView;
