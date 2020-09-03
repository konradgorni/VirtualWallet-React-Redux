import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LineChart from 'components/organic/LineChart';

const StatisticPageView = ({ userID }) => {
  const [width, setWidth] = useState(true);

  useEffect(() => {
    setWidth(window.innerWidth);
  });

  window.addEventListener('resize', () => setWidth(window.innerWidth));

  const StyledWrapper = styled.div`
    width: 85%;
    min-height: 100vh;
    margin-left: 15%;
    background-color: ${({ theme }) => theme.color2};
  `;
  const StyledText = styled.p`
    font-size: 45px;
    color: white;
    text-align: center;
    font-weight: bold;
  `;

  return (
    <>
      <StyledWrapper>
        {width > 550 ? (
          <>
            <LineChart />
          </>
        ) : (
          <StyledText>Rotate the screen to see statistic</StyledText>
        )}
      </StyledWrapper>
    </>
  );
};

StatisticPageView.propTypes = {
  userID: PropTypes.string.isRequired,
};

export default StatisticPageView;
