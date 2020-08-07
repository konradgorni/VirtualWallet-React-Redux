import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/mainTheme';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePageView from 'views/HomePageView';
import RegisterPageView from 'views/RegisterPageView';
import LoginPageView from 'views/LoginPageView';
import TransactionPageView from 'views/TransactionPageView';
import NewTrasactionView from 'views/NewTrasactionView';
import StatisticPageView from 'views/StatisticPageView';

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
            <Route path="/stats" component={StatisticPageView} />
            <Route path="/transactions" component={TransactionPageView} />
            <Route path="/newtransaction" component={NewTrasactionView} />
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
};

export default Root;
