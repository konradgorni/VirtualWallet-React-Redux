import styled, { css } from 'styled-components';

const HeaderText = styled.h1`
  color: ${({ theme }) => theme.text};
  padding: 0;
  margin: 0;
  font-size: 55px;
  text-align:center;

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
      ${({ white }) =>
        white &&
        css`
          color: white;
        `}
`;

export default HeaderText;
