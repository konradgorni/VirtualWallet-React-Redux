import { device } from 'theme/breakpoints';
import styled from 'styled-components';
import HeaderText from 'components/atoms/HeaderText';

export const StyledWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const StyledHeaderText = styled(HeaderText)`
  text-align: center;
  padding: 5% 0;
  @media ${device.laptop} {
    font-size: 35px;
  }
  @media ${device.tablet} {
    font-size: 32px;
  }
`;
