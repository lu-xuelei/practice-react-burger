import React, { Component } from "react";
import { connect } from 'react-redux';

import classes from "./ContactData.css";
import Button from "../../../components/UI/button/Button";
import Spinner from "../../../components/UI/spinner/Spinner";
import Input from "../../../components/UI/input/Input";
import axios from '../../../axios-orders'
import * as actions from '../../../store/actions/Actions'
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

class ContactData extends Component {
  state = {
    formIsValid: false,
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validationRules: {
          required: true
        },
        valid: false,
        touched: false,
        errorMsg:'Please enter your name'
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validationRules: {
          required: true,
          maxLength: 60
        },
        valid: false,
        touched: false,
        errorMsg:'Please enter your email address'
      },
      streed: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validationRules: {
          required: true
        },
        valid: false,
        touched: false,
        errorMsg:'Please enter your street name'
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: "",
        validationRules: {
          required: true,
          minLength: 5,
          maxLength: 6
        },
        valid: false,
        touched: false,
        errorMsg:'Please enter a valid postal code'
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validationRules: {
          required: true
        },
        valid: false,
        touched: false,
        errorMsg:'Please enter name of your country'
      },
      deleveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validationRules: {
        },
        valid: true
      }
    },
  };

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let inputElement in this.state.orderForm) {
      formData[inputElement] = this.state.orderForm[inputElement].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };
    this.props.purchaseBurger(order);
  };

  validateInput(input, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = input.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = input.trim().length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = input.trim().length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputEventHandler = (event, elementId) => {
    // Clone the order form (this will not clone the objects, but clone the pointer to the object only)
    const updatedOrderForm = {...this.state.orderForm};

    // Clone the related input element
    const updatedInputElement = {...updatedOrderForm[elementId]}
    updatedInputElement.value = event.target.value;

    // Validate the input agains the pre-defined rules
    updatedInputElement.valid = this.validateInput(updatedInputElement.value, updatedInputElement.validationRules);
    updatedInputElement.touched = true;
    updatedOrderForm[elementId] = updatedInputElement;

    // Check form validity
    let formIsValid = true;
    for (let inputElem in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputElem].valid && formIsValid;
    }
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  render() {
    let inputElements = [];
    for (let key in this.state.orderForm) {
      inputElements.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {inputElements.map(element => (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            elementValue={element.config.value}
            invalid={!element.config.valid}
            touched={element.config.touched}
            errorMessage={element.config.errorMsg}
            changed={(event) => this.inputEventHandler(event, element.id)}
          />
        ))}
        <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Please enter your contact</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.purchase.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    purchaseBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
