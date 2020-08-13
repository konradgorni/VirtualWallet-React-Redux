import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/mainTheme';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import HomePageView from 'views/HomePageView';
import RegisterPageView from 'views/RegisterPageView';
import LoginPageView from 'views/LoginPageView';
import AuthPageHome from 'views/AuthPageHome';
import PrivateRoute from 'views/PrivateRoute';

const Root = () => {
  return (
    <Router>
      <div>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/" component={HomePageView} />
            <Route path="/register" component={RegisterPageView} />
            <Route path="/login" component={LoginPageView} />
            <PrivateRoute path="/authpagehome" component={AuthPageHome} />
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
};

export default Root;
