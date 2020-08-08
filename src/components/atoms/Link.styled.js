import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import React from 'react';

const StyledLink = styled(({ btn, ...props }) => <Link {...props} />)`
  font-size: 25px;
  text-decoration: none;
  color: ${({ theme }) => theme.color1};

  ${({ btn }) =>
    btn &&
    css`
      height: 50px;
      width: 200px;
      border: 1px solid ${({ theme }) => theme.color1};
      color: ${({ theme }) => theme.text};
      text-align: center;
      line-height: 50px;
      transition: 0.5s ease-in-out;
      :hover {
        background-color: ${({ theme }) => theme.color1};
      }
    `}
`;

const LinkRouter = ({ to, name, btn }) => {
  return (
    <>
      {btn ? (
        <StyledLink btn to={to}>
          {name}
        </StyledLink>
      ) : (
        <StyledLink to={to}>{name}</StyledLink>
      )}
    </>
  );
};
export default LinkRouter;
