import React, { Component } from "react";
import Aux from "../../hoc/_aux/_Aux";
import Burger from "../../components/burger/Burger";
import BurgerControls from "../../components/burger/buildControls/BuildControls";
import Modal from "../../components/UI/modal/Modal";
import OrderSummary from "../../components/burger/orderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const MAX_INGREDIENT = 3;

class BurgerBuilder extends Component {
  // alternative way to initialize the state
  // constructor(props) {
  //     super(props);
  //     state = {...}
  // }

  state = {
    ingredients: null,
    totalPrice: 4.0,
    hasIngredients: false,
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

  updateIngredientStatus(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((total, elem) => {
        return total + elem;
      }, 0);
    this.setState({ hasIngredients: sum > 0 });
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
    queryParams.push('price=' + this.state.totalPrice);
    
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParams.join('&')
    });
  };

  addIngredientHandler = type => {
    if (this.state.ingredients[type] >= MAX_INGREDIENT) {
      return;
    }
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updateIngredientStatus(updatedIngredients);
  };

  removeIngredientHandler = type => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const updatedCount = this.state.ingredients[type] - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updateIngredientStatus(updatedIngredients);
  };

  render() {
    let disabledRemoveInfo = { ...this.state.ingredients };
    let disabledAddInfo = { ...this.state.ingredients };
    for (let key in this.state.ingredients) {
      disabledRemoveInfo[key] = disabledRemoveInfo[key] <= 0;
      disabledAddInfo[key] = disabledAddInfo[key] >= MAX_INGREDIENT;
    }

    let orderSummary = <Spinner />;
    let burger = <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BurgerControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            disabledAdd={disabledAddInfo}
            disabledRemove={disabledRemoveInfo}
            price={this.state.totalPrice}
            hasIngredients={this.state.hasIngredients}
            checkout={this.checkoutHandler}
          />
        </Aux>
      );

      if (!this.state.loading) {
        orderSummary = (
          <OrderSummary
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
