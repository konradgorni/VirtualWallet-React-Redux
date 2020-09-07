import HeaderText from 'components/atoms/HeaderText';
import { device } from 'theme/breakpoints';
import Button from 'components/atoms/Button';
import { Input } from 'components/atoms/FormikComponents';
import styled from 'styled-components';
import { Form } from 'formik';

export const StyledWrapper = styled.div`
  width: 85vw;
  height: 100vh;
  margin-left: 15vw;
  background-color: ${({ theme }) => theme.color2};
`;

export const StyledForm = styled(Form)`
  display: flex;
  height: 35vh;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const StyledSelect = styled.select`
  width: 300px;
  height: 60px;
  @media ${device.mobileS} {
    width: 100%;
  }
`;

export const StyledHeader = styled(HeaderText)`
  text-align: center;
  padding: 5% 0;
  color: white;
  @media ${device.mobileS} {
    font-size: 35px;
  }
`;

export const StyledButton = styled(Button)`
  @media ${device.mobileS} {
    width: 100%;
  }
`;

export const StyledInput = styled(Input)`
  @media ${device.mobileS} {
    width: 100%;
  }
`;
