import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './buildControl/BuildControl';

const controls = [
    { label: 'Cheese', type: 'cheese' },
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' }
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
    <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => {
            return <BuildControl 
                        key={ctrl.label} 
                        label={ctrl.label} 
                        add={() => props.addIngredient(ctrl.type)} 
                        remove={() => props.removeIngredient(ctrl.type)}
                        disabledAdd={props.disabledAdd[ctrl.type]} 
                        disabledRemove={props.disabledRemove[ctrl.type]}/>
        })}
        <button className={classes.OrderButton} 
            disabled={!props.hasIngredients}
            onClick={props.checkout}>Checkout</button>
    </div>
)

export default buildControls;