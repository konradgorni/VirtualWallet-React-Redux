import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from 'firebase/fire';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faHome,
  faExchangeAlt,
  faSignOutAlt,
  faUsersCog,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';

const StyledWrapper = styled.div`
  width: 15vw;
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
  transition: 0.5s ease-in-out;
  :hover {
    color: ${({ theme }) => theme.color1};
  }
`;

const Sidebar = () => {
  let history = useHistory();
  const singout = () => {
    auth.signOut();
    return history.push('/');
  };
  return (
    <>
      <StyledWrapper>
        <FontAwesomeIcon icon={faWallet} size="4x" color="#eedad1" />
        <Link to="/authpagehome/stats">
          <StyledIcon icon={faHome} size="3x" color="#f69e7b" />
        </Link>
        <Link to="/authpagehome/transactions">
          <StyledIcon icon={faExchangeAlt} size="3x" color="#f69e7b" />
        </Link>
        <Link to="/authpagehome/newtransaction">
          <StyledIcon icon={faPlusSquare} size="3x" color="#f69e7b" />
        </Link>
        <Link to="/authpagehome/settings">
          <StyledIcon icon={faUsersCog} size="3x" color="#f69e7b" />
        </Link>

        <div>
          <StyledIcon onClick={singout} icon={faSignOutAlt} size="3x" color="#f69e7b" />
        </div>
      </StyledWrapper>
    </>
  );
};
export default Sidebar;
