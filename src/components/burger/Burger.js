import React from 'react';
import classes from './Burger.css'
import BurgerIntgredient from './burgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIntgredient key={igKey + i} type={igKey} />;
        });
    })
    .reduce((arr, elem) => {
        return arr.concat(elem);
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIntgredient type="bread-top" />
            {transformedIngredients}
            <BurgerIntgredient type="bread-bottom" />
        </div>
    );
}

export default burger;