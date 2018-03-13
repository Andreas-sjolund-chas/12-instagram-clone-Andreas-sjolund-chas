import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router";

// This is now a HIGHER ORDER COMPONENT, it wraps other components
export default function(ComposedComponent) {
  class Authenticated extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    componentWillMount() {
      if (!this.props.isAuthenticated) {
        return this.context.router.history.push("/login/signin");
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.isAuthenticated) {
        return this.context.router.history.push("/login/signin");
      }
    }

    redirectToLogin() {
      return <Redirect to="/login/signin" />
    }

    renderComposedComponent() {
      return <ComposedComponent {...this.props} />
    }

    render() {
      return !this.props.isAuthenticated
        ? this.redirectToLogin()
        : this.renderComposedComponent();
    }
  }

  function mapStateToProps(state) {
    return { isAuthenticated: state.user.isAuthenticated };
  }

  return connect(mapStateToProps)(Authenticated);
}
