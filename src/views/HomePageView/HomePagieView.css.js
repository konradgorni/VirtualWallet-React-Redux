import { device } from 'theme/breakpoints';
import styled from 'styled-components';
import HeaderText from 'components/atoms/HeaderText';

export const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.bgc};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Brand = styled(HeaderText)`
  padding-bottom: 5%;
  @media ${device.mobileM} {
    font-size: 40px;
  }
`;

export const StyledWrapperButton = styled.div`
  width: 60vw;
  height: 5vh;
  display: flex;
  justify-content: space-around;
  @media ${device.tablet} {
    height: 20vh;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
`;
