import React from 'react';
import Sidebar from 'components/organic/Sidebar';
import { Switch, Route, Link } from 'react-router-dom';
import TransactionPageView from 'views/TransactionPageView';
import NewTrasactionView from 'views/NewTrasactionView';
import StatisticPageView from 'views/StatisticPageView';

const AuthPageHome = () => {
  return (
    <>
      <Sidebar />
      <Switch>
        <Route path="/authpagehome/stats" component={StatisticPageView} />
        <Route path="/authpagehome/transactions" component={TransactionPageView} />
        <Route path="/authpagehome/newtransaction" component={NewTrasactionView} />
      </Switch>
    </>
  );
};

export default AuthPageHome;
