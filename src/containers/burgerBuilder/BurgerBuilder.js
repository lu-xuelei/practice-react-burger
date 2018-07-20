import React, { Component } from 'react';
import Aux from '../../hoc/_aux/_Aux';
import Burger from '../../components/burger/Burger';
import BurgerControls from '../../components/burger/buildControls/BuildControls';
import Modal from '../../components/UI/modal/Modal';
import OrderSummary from '../../components/burger/orderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    salad: 0.50,
    cheese: 0.40,
    meat: 1.30,
    bacon: 0.70
}

const MAX_INGREDIENT = 3;

class BurgerBuilder extends Component {

    // alternative way to initialize the state
    // constructor(props) {
    //     super(props);
    //     state = {...}
    // }

    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        totalPrice: 4.00,
        hasIngredients: false,
        checkout: false
    }

    updateIngredientStatus(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => { return ingredients[igKey] })
            .reduce((total, elem) => {
                return total + elem
            }, 0);
        this.setState({ hasIngredients: sum > 0 });
    }

    checkoutHandler = () => {
        this.setState({checkout: true});
    }

    cancelCheckoutHandler =() => {
        this.setState({checkout: false});
    }

    continueCheckoutHandler =() => {
        alert("continue checkout");
    }

    addIngredientHandler = (type) => {
        if (this.state.ingredients[type] >= MAX_INGREDIENT) {
            return;
        }
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updateIngredientStatus(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <= 0) {
            return;
        }
        const updatedCount = this.state.ingredients[type] - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updateIngredientStatus(updatedIngredients);
    }

    render() {
        let disabledRemoveInfo = { ...this.state.ingredients }
        let disabledAddInfo = { ...this.state.ingredients }
        for (let key in this.state.ingredients) {
            disabledRemoveInfo[key] = disabledRemoveInfo[key] <= 0;
            disabledAddInfo[key] = disabledAddInfo[key] >= MAX_INGREDIENT;
        }

        return (
            <Aux>
                <Modal show={this.state.checkout} modalClosed={this.cancelCheckoutHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice} 
                        cancelOrder={this.cancelCheckoutHandler}
                        continueOrder={this.continueCheckoutHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabledAdd={disabledAddInfo}
                    disabledRemove={disabledRemoveInfo}
                    price={this.state.totalPrice}
                    hasIngredients={this.state.hasIngredients}
                    checkout={this.checkoutHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;