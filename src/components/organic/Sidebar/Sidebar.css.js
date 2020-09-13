import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { device } from 'theme/breakpoints';

export const StyledWrapper = styled.div`
  width: 15%;
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

export const StyledIcon = styled(FontAwesomeIcon)`
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
