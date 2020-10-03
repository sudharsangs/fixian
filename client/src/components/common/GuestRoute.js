import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const GuesteRoute = ({ component: Component, user, ...rest }) => {
  const { isAuth } = user.userData;
  return (
    <Route
      {...rest} //exact, path, etc.
      render={props => {
        //these props are match,history,location
        return isAuth === true ? (
          <Redirect to="/stores" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps)(GuesteRoute));
