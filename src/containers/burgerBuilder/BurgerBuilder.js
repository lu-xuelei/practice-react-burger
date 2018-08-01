import React, { Component } from "react";
import {connect} from 'react-redux';

import * as AT from '../../store/Orders';
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
    // ingredients: null,
    // totalPrice: 4.0,
    //hasIngredients: false,
    checkout: false,
    loading: false,
    error: false
  };

  // Load ingredients from remote database
  componentDidMount () {
    axios.get('/ingredients.json').then(response => {
      this.setState({ ingredients: response.data });
    }).catch (error => {
      this.setState({error: true});
    });
  }

  // to check whether any ingredients are radded to the burger
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
    //alert("continue checkout");

    const queryParams = [];

    // Pass order information via params
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.props.totalPrice);
    
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParams.join('&')
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
            addIngredient={this.props.addIngredientHandler}
            removeIngredient={this.props.removeIngredientHandler}
            disabledAdd={disabledAddInfo}
            disabledRemove={disabledRemoveInfo}
            price={this.props.totalPrice}
            hasIngredients={this.hasIngredients()}
            checkout={this.checkoutHandler}
          />
        </Aux>
      );

      if (!this.state.loading) {
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchAsProps = (dispatch) => {
  return {
    addIngredientHandler: (ingType) => dispatch({type:AT.ADD_INGREDIENT, ingType: ingType}),
    removeIngredientHandler: (ingType) => dispatch({type:AT.REMOVE_INGREDIENT, ingType: ingType}),
  }
}

export default connect(mapStateAsProps, mapDispatchAsProps)( withErrorHandler(BurgerBuilder, axios) );
