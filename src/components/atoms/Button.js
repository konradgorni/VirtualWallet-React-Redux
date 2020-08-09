import styled, { css } from 'styled-components';

const Button = styled.h1`
  background-color: ${({ theme }) => theme.color2};
  width: 250px;
  height: 50px;

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
