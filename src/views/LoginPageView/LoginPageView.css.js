import styled from 'styled-components';
import HeaderText from 'components/atoms/HeaderText';
import { device } from 'theme/breakpoints';
import { Formik, Form } from 'formik';
import { Input } from 'components/atoms/FormikComponents';
import Button from 'components/atoms/Button';

export const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.bgc};
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const StyledContent = styled.div`
  width: 50%;
  height: 35vh;
  margin: 0px auto;
  justify-content: space-around;
  align-items: center;
  display: flex;
  @media ${device.tablet} {
    flex-direction: column;
  }
`;
export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 25vh;
  align-content: space-between;
`;

export const StyledInput = styled(Input)`
  @media ${device.mobileM} {
    width: 250px;
    margin: 0 auto;
  }
`;
export const StyledButton = styled(Button)`
  @media ${device.mobileM} {
    width: 250px;
    margin: 0 auto;
  }
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
