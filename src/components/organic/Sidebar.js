import React from 'react';
import { auth } from 'firebase/fire';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faHome,
  faExchangeAlt,
  faSignOutAlt,
  faUsersCog,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { device } from 'theme/breakpoints';

const StyledWrapper = styled.div`
  width: 15%;
  /* width: 15vw; */
  height: 100vh;
  position: fixed;
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
  font-size: 55px;
  transition: 0.5s ease-in-out;
  @media ${device.tablet} {
    font-size: 45px;
  }
  @media ${device.mobileM} {
    font-size: 35px;
  }

  :hover {
    color: ${({ theme }) => theme.color1};
  }
`;

const Sidebar = () => {
  const history = useHistory();
  const singout = () => {
    auth.signOut();
    return history.push('/');
  };
  return (
    <>
      <StyledWrapper>
        <StyledIcon icon={faWallet} size="4x" color="#eedad1" />
        <Link to="/authpagehome/stats">
          <StyledIcon icon={faHome} color="#f69e7b" />
        </Link>
        <Link to="/authpagehome/transactions">
          <StyledIcon icon={faExchangeAlt} color="#f69e7b" />
        </Link>
        <Link to="/authpagehome/newtransaction">
          <StyledIcon icon={faPlusSquare} color="#f69e7b" />
        </Link>
        <Link to="/authpagehome/settings">
          <StyledIcon icon={faUsersCog} color="#f69e7b" />
        </Link>

        <div>
          <StyledIcon onClick={singout} icon={faSignOutAlt} size="3x" color="#f69e7b" />
        </div>
      </StyledWrapper>
    </>
  );
};
export default Sidebar;
