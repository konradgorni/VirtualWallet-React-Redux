import styled, { css } from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  width: 200px;
  height: 47px;
  border: none;
  border-radius: 50px;
  font-family: 'Montserrat';
  font-weight: 500;
  text-transform: uppercase;
  font-size: 16px;

  ${({ secondary }) =>
    secondary &&
    css`
      background-color: ${({ color }) => color || '#e6e6e6;'};
      width: 105px;
      height: 30px;
      font-size: 10px;
    `}
`;

export default Button;
