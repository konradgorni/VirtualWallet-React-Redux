import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, path, auth, ...rest }) => {
  const isAuth = auth;
  return (
    <Route
      path={path}
      render={(props) => (isAuth ? <Component {...props} /> : <Redirect to={'/'} />)}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth.auth,
});

export default connect(mapStateToProps, null)(PrivateRoute);
