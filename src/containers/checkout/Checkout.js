import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

//import classes from "./Checkout.css";
import CheckoutSummary from "../../components/order/checkoutSummary/CheckoutSummary";
import ContactData from "./contactData/ContactData";

class Checkout extends Component {
  componentWillMount() {
    // Retrieve parameter values from query and form the input object
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;

    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients && !this.props.purchased) {
      summary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const matStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    purchased: state.purchase.purchased
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     checkoutCancelledHandler: () => dispatch({type: AT.CANCEL_CHECKOUT}),
//     checkoutContinuedHandler: () => dispatch({type: AT.CONTINUE_CHECKOUT})
//   }
// }

export default connect(matStateToProps)(Checkout);
