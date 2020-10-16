import React from 'react';
import { auth } from 'firebase/fire';
import { withRouter } from 'react-router-dom';
import { useHistory, Link } from 'react-router-dom';
import {
  faWallet,
  faHome,
  faExchangeAlt,
  faSignOutAlt,
  faUsersCog,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { StyledWrapper, StyledIcon } from './Sidebar.css.js';

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
          <Link to="">
            <StyledIcon onClick={singout} icon={faSignOutAlt} size="3x" color="#f69e7b" />
          </Link>
        </div>
      </StyledWrapper>
    </>
  );
};
export default Sidebar;
