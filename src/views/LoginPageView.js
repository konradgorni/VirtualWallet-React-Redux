import React from 'react';
import styled from 'styled-components';
import HeaderText from 'components/atoms/HeaderText';
import LinkRouter from 'components/atoms/Link.styled';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.bgc};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledContent = styled.div`
  width: 50%;
  height: 30vh;
  margin: 0px auto;
  justify-content: space-between;
  align-items: center;
  display: flex;
  /* background-color: green; */
`;
const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 25vh;
  align-content: space-between;
  /* background-color: red; */
`;

const StyledInput = styled.input`
  width: 300px;
  height: 60px;
  border-radius: 2px;
  border: none;
  padding: 15px;
`;

const LoginPageView = () => {
  return (
    <StyledWrapper>
      <StyledContent>
        <HeaderText>VirtualWallet</HeaderText>
        <StyledInputWrapper>
          <StyledInput type="text" placeholder="login" />
          <StyledInput type="password" placeholder="password" />
          <LinkRouter btn name="LOGIN" to="/stats" />
        </StyledInputWrapper>
      </StyledContent>
    </StyledWrapper>
  );
};

export default LoginPageView;
