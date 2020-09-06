import React, { useEffect } from 'react';
import Sidebar from 'components/organic/Sidebar';
import { Switch, Route } from 'react-router-dom';
import TransactionPageView from 'views/TransactionPageView';
import NewTrasactionView from 'views/NewTrasactionView';
import StatisticPageView from 'views/StatisticPageView';
import UserSettingsView from 'views/UserSettingsView';
import { auth } from 'firebase/fire';
import { userInfoAction } from 'data/actions/userInfo';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

const AuthPageHome = ({ userInfo }) => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      userInfo(user.email, user.uid);
    });
  }, []);
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

AuthPageHome.propTypes = {
  userInfo: PropTypes.shape({
    email: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    userInfo: (email, uid) => dispatch(userInfoAction(email, uid)),
  };
};

export default connect(null, mapDispatchToProps)(AuthPageHome);
