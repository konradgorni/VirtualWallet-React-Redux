import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/mainTheme';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import HomePageView from 'views/HomePageView/HomePageView';
import RegisterPageView from 'views/RegisterPageView/RegisterPageView';
import LoginPageView from 'views/LoginPageView/LoginPageView';
import AuthPageHome from 'views/AuthPageHome/AuthPageHome';
import PrivateRoute from 'security/PrivateRoute';

const Root = () => {
  return (
    <Router basename="/">
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
