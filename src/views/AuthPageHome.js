import React, { useEffect } from 'react';
import Sidebar from 'components/organic/Sidebar';
import { Switch, Route } from 'react-router-dom';
import TransactionPageView from 'views/TransactionPageView';
import NewTrasactionView from 'views/NewTrasactionView';
import StatisticPageView from 'views/StatisticPageView';
import UserSettingsView from 'views/UserSettingsView';
import { auth } from 'firebase/fire';
import { userInfo } from 'data/actions/userInfo';
import { connect } from 'react-redux';

const AuthPageHome = ({ userInfo }) => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      userInfo(user.email, user.uid);
    });
  });
  return (
    <>
      <Sidebar />
      <Switch>
        <Route path="/authpagehome/stats" component={StatisticPageView} />
        <Route path="/authpagehome/transactions" component={TransactionPageView} />
        <Route path="/authpagehome/newtransaction" component={NewTrasactionView} />
        <Route path="/authpagehome/settings" component={UserSettingsView} />
      </Switch>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    userInfo: (email, uid) => dispatch(userInfo(email, uid)),
  };
};

export default connect(null, mapDispatchToProps)(AuthPageHome);
