import React, { useEffect, useState } from 'react';
import Sidebar from 'components/organic/Sidebar/Sidebar';
import { Switch, Route, useLocation } from 'react-router-dom';
import TransactionPageView from 'views/TransactionPageView/TransactionPageView';
import NewTrasactionView from 'views/NewTransactionView/NewTransactionView';
import StatisticPageView from 'views/StatisticPageView/StatisticPageView';
import UserSettingsView from 'views/UserSettingsView/UserSettingsView';
import FirstLoginUserWallet from 'views/FirstLoginUserWallet/FirstLoginUserWallet';
import { auth } from 'firebase/fire';
import { userInfoAction } from 'data/actions/userInfo';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { fireStoreFetch } from 'components/utils/fireStoreFetch';

const AuthPageHome = ({ userInfo }) => {
  const { pathname } = useLocation();
  const [path, setPath] = useState(false);

  const routeName = 'firstuserwallet';
  useEffect(() => {
    pathname.includes(routeName) ? setPath(true) : setPath(false);
    if (userInfo) {
      auth.onAuthStateChanged(({ email, uid }) => {
        userInfo(email, uid);
      });
    }
  }, [pathname]);
  return (
    <>
      {/* {firstWallet ? null : <Sidebar />} */}
      {path ? null : <Sidebar />}
      <Switch>
        <Route path="/authpagehome/stats" component={StatisticPageView} />
        <Route path="/authpagehome/transactions" component={TransactionPageView} />
        <Route path="/authpagehome/newtransaction" component={NewTrasactionView} />
        <Route path="/authpagehome/settings" component={UserSettingsView} />
        <Route path="/authpagehome/firstuserwallet" component={FirstLoginUserWallet} />
      </Switch>
    </>
  );
};

AuthPageHome.propTypes = {
  userInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    userInfo: (email, uid) => dispatch(userInfoAction(email, uid)),
  };
};

export default connect(null, mapDispatchToProps)(AuthPageHome);
