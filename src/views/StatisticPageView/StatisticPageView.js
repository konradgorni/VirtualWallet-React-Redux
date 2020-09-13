import React, { useEffect, useState } from 'react';
import LineChart from 'components/organic/LineChart/LineChart';
import { StyledWrapper, StyledText } from './StatisticPageView.css';

const StatisticPageView = () => {
  const [width, setWidth] = useState();

  useEffect(() => {
    setWidth(window.innerWidth);

    function cb() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', cb);
    return () => window.removeEventListener('resize', cb);
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

export default StatisticPageView;
