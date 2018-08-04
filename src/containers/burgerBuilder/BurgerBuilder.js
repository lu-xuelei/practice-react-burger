import React, { Component } from "react";
import {connect} from 'react-redux';

import * as actions from '../../store/actions/Actions';

import Aux from "../../hoc/_aux/_Aux";
import Burger from "../../components/burger/Burger";
import BurgerControls from "../../components/burger/buildControls/BuildControls";
import Modal from "../../components/UI/modal/Modal";
import OrderSummary from "../../components/burger/orderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const MAX_INGREDIENT = 3;

class BurgerBuilder extends Component {
  // alternative way to initialize the state
  // constructor(props) {
  //     super(props);
  //     state = {...}
  // }

  state = {
    checkout: false,
    loading: false,
  };

  componentDidMount() {
    this.props.initIngredients();
  }

  hasIngredients() {
    const sum = Object.keys(this.props.ingredients)
      .map(igKey => {
        return this.props.ingredients[igKey];
      })
      .reduce((total, elem) => {
        return total + elem;
      }, 0);
    return sum > 0 ;
  }

  checkoutHandler = () => {
    this.setState({ checkout: true });
  };

  cancelCheckoutHandler = () => {
    this.setState({ checkout: false });
  };

  continueCheckoutHandler = () => {
    this.props.checkoutStart();
    this.props.history.push({
      pathname: '/checkout',
    });
  };

  render() {
    let disabledRemoveInfo = { ...this.props.ingredients };
    let disabledAddInfo = { ...this.props.ingredients };
    for (let key in this.props.ingredients) {
      disabledRemoveInfo[key] = disabledRemoveInfo[key] <= 0;
      disabledAddInfo[key] = disabledAddInfo[key] >= MAX_INGREDIENT;
    }

    let orderSummary = <Spinner />;
    let burger = <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BurgerControls
            addIngredient={this.props.addIngredient}
            removeIngredient={this.props.removeIngredient}
            disabledAdd={disabledAddInfo}
            disabledRemove={disabledRemoveInfo}
            price={this.props.totalPrice}
            hasIngredients={this.hasIngredients()}
            checkout={this.checkoutHandler}
          />
        </Aux>
      );

      if (!this.props.error) {
        orderSummary = (
          <OrderSummary
            ingredients={this.props.ingredients}
            totalPrice={this.props.totalPrice}
            cancelOrder={this.cancelCheckoutHandler}
            continueOrder={this.continueCheckoutHandler}
          />
        );
      }
    }
    
    return (
      <Aux>
        <Modal
          show={this.state.checkout}
          modalClosed={this.cancelCheckoutHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateAsProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error
  }
}

const mapDispatchAsProps = (dispatch) => {
  return {
    checkoutStart: () => dispatch(actions.checkoutStart()),
    addIngredient: (ingType) => dispatch(actions.addIngredient(ingType)),
    removeIngredient: (ingType) => dispatch(actions.removeIngredient(ingType)),
    initIngredients: () => dispatch(actions.initIngredients()),
  }
}

export default connect(mapStateAsProps, mapDispatchAsProps)( withErrorHandler(BurgerBuilder, axios) );
