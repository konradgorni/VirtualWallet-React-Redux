import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/mainTheme';
import Button from 'components/Button';

const Root = () => {
  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <>
          <Button>Close save</Button>
          <Button secondary>Remove</Button>
        </>
      </ThemeProvider>
    </div>
  );
};

export default Root;
