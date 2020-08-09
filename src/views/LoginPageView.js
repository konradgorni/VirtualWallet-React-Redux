import React, { useState } from 'react';
import styled from 'styled-components';
import HeaderText from 'components/atoms/HeaderText';
import Button from 'components/atoms/Button';
import fire from '../firebase/fire';

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const singup = (e) => {
  //   e.preventDefault();
  //   fire
  //     .auth()
  //     .createUserWithEmailAndPassword(username, password)
  //     .then((u) => {
  //       console.log(u);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const login = (e) => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then((u) => {
        console.log(u);
      })
      .catch((err) => {
        alert('password or username is invalid');
      });
  };
  return (
    <StyledWrapper>
      <StyledContent>
        <HeaderText>VirtualWallet</HeaderText>
        <StyledInputWrapper>
          <StyledInput
            onChange={(event) => setUsername(event.target.value)}
            type="text"
            placeholder="login"
          />
          <StyledInput
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="password"
          />
          <Button>alla</Button>
        </StyledInputWrapper>
      </StyledContent>
    </StyledWrapper>
  );
};

export default LoginPageView;
