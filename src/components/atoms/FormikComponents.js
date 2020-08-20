import React from 'react';
import styled from 'styled-components';
import { Field, ErrorMessage } from 'formik';

const Input = styled(Field)`
  width: 300px;
  height: 60px;
  border-radius: 2px;
  border: none;
  padding: 15px;
`;
export const StyledInput = ({ placeholder, type, name }) => {
  return <Input placeholder={placeholder} type={type} name={name} />;
};

export const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
`;
