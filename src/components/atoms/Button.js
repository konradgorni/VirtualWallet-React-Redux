import styled, { css } from 'styled-components';

const Button = styled.h1`
  background-color: ${({ theme }) => theme.text2};

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
