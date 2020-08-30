import { Field, ErrorMessage } from 'formik';
import styled, { css } from 'styled-components';
export const Input = styled(Field)`
  width: 300px;
  height: 60px;
  border-radius: 2px;
  border: none;
  padding: 15px;
  ${({ smallMobile }) =>
    smallMobile &&
    css`
      width: 100%;
    `}
`;

export const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
`;
