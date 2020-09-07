import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import HeaderText from 'components/atoms/HeaderText';
import { device } from 'theme/breakpoints';
import BootstrapTable from 'react-bootstrap-table-next';

export const StyledWrapper = styled.div`
  width: 85vw;
  min-height: 100vh;
  margin-left: 15vw;
  background-color: ${({ theme }) => theme.color2};
  padding: 1%;
  overflow-x: hidden;
  @media ${device.tablet} {
    padding: 0;
  }
`;

export const StyledHeader = styled.div`
  width: 100%;
  height: 15vh;
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;

    p {
      display: block;
      height: 30px;
      line-height: 30px;
      margin: 0;
      padding: 0;
    }
  }
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  transition: 0.5s ease-in-out;
  display: block;
  height: 30px;
`;

export const StyledTableWrapper = styled.div`
  width: 100%;
  height: auto;
`;
export const StyledHeaderTitle = styled(HeaderText)`
  text-align: center;
  color: white;
  font-size: 45px;
  @media ${device.mobileL} {
    font-size: 40px;
  }
`;
export const StyledNav = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: center;
`;
export const StyledBootstrapTable = styled(BootstrapTable)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const SearchWrapper = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
