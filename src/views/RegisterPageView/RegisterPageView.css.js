import { Input, StyledErrorMessage } from 'components/atoms/FormikComponents';
import { Form } from 'formik';
import { device } from 'theme/breakpoints';
import styled from 'styled-components';
import HeaderText from 'components/atoms/HeaderText';

export const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.bgc};
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const StyledContent = styled.div`
  width: 40vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 45vh;

  align-content: space-between;
`;

export const StyledIncorrectMessage = styled.p`
  color: red;
  font-size: 20px;
  text-decoration: underline;
`;
export const StyledHeader = styled(HeaderText)`
  @media ${device.mobileM} {
    font-size: 40px;
  }
`;

export const StyledInput = styled(Input)`
  @media ${device.mobileM} {
    width: 250px;
    margin: 0 auto;
  }
`;
export const ErrorMessage = styled(StyledErrorMessage)`
  @media ${device.mobileM} {
    margin: 0 auto;
  }
`;
