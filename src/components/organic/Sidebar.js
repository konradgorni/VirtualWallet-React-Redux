import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faHome, faExchangeAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const StyledWrapper = styled.div`
  width: 15vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.bgc};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 5vh 0px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.text};
`;

const StyledLinkIcon = styled(Link)``;

const Sidebar = () => {
  return (
    <StyledWrapper>
      <StyledLinkIcon to="/login">
        <StyledIcon icon={faWallet} size="4x" />
      </StyledLinkIcon>
      <StyledLinkIcon to="/stats">
        <StyledIcon icon={faHome} size="3x" />
      </StyledLinkIcon>
      <StyledLinkIcon to="/transactions">
        <StyledIcon icon={faExchangeAlt} size="3x" />
      </StyledLinkIcon>
      <StyledLinkIcon to="/">
        <StyledIcon icon={faSignOutAlt} size="3x" />
      </StyledLinkIcon>
    </StyledWrapper>
  );
};
export default Sidebar;
