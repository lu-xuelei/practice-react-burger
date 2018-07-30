import React from "react";
import classes from "./CheckoutSummary.css";
import Burger from '../../burger/Burger';
import Button from '../../UI/button/Button';

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Summary of your burger order</h1>
      <div stype={{width:'100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
    </div>
  );
};

export default checkoutSummary;
