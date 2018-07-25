import React, { Component } from "react";
import Model from "../../components/UI/modal/Modal";
import Aux from "../_aux/_Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    // Intercept the request and response to detect errors
    componentWillMount() {
      // Intercept request to remove the previous error
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      // Intercept response and detect error
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      });
    }

    componentWillUnmount () {
      // remove interceptor while unmount
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmHandler = () => {
      this.setState({ error: null });
    }

    render() {
      return (
        <Aux>
          <Model 
            show={this.state.error}
            modalClosed={this.errorConfirmHandler}>
           {this.state.error ? this.state.error.message : null}
          </Model>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
