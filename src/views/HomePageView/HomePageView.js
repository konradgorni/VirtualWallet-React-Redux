import React from 'react';
import LinkRouter from 'components/atoms/Link.styled';

import { StyledWrapper, Brand, StyledWrapperButton } from './HomePagieView.css';

const HomePageView = () => {
  return (
    <StyledWrapper>
      <Brand>VirtualWallet</Brand>
      <StyledWrapperButton>
        <LinkRouter btn name="LOGIN" to="/login" />
        <LinkRouter btn name="REGISTER" to="/register" />
      </StyledWrapperButton>
    </StyledWrapper>
  );
};

export default HomePageView;
