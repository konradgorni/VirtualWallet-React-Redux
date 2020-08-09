import React from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.bgc};
  width: 300px;
  height: 50px;
  border: none;
  border-radius: 5px;
  text-transform: uppercase;
  font-size: 30px;
  font-weight: bold;
  transition: 0.5s ease-in-out;

  :hover {
    color: ${({ theme }) => theme.color1};
    cursor: pointer;
  }

  ${({ medium }) =>
    medium &&
    css`
      font-size: 45px;
    `}
  ${({ small }) =>
    small &&
    css`
      font-size: 35px;
    `}
`;

export default Button;
