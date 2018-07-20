import React from 'react'
import Aux from '../../../hoc/_aux/_Aux'
import Button from '../../UI/button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey} : </span> {props.ingredients[igKey]}</li>
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p> A dlicious burger with the following ingredient</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: {props.totalPrice.toFixed(2)}</p>
            <p>Continue to check out</p>
            <Button btnType="Danger" clicked={props.cancelOrder}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continueOrder}>CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary;