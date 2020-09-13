import React, { useEffect } from 'react';

export const Spiner = ({ isLoadingVisible, changeLoadingVisible }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      changeLoadingVisible();
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return isLoadingVisible ? <p>loading</p> : null;
};
