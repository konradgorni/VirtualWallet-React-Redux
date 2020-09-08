import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LineChart from 'components/organic/LineChart/LineChart';
import { StyledWrapper, StyledText } from './StatisticPageView.css';

const StatisticPageView = ({ userID }) => {
  const [width, setWidth] = useState(true);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

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
