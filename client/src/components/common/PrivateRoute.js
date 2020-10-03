import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const { isAuth } = user.userData;
  return (
    <Route
      {...rest} //exact, path, etc.
      render={props => {
        //these props are match,history,location
        return isAuth === true ? (
          <Component {...props} user={user.userData} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
