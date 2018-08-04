import React from "react";
import classes from "./Order.css";

const order = props => {
  const ingredients = [];
  for (let ingName in props.ingredients) {
    ingredients.push({
      name: ingName,
      amount: props.ingredients[ingName]
    });
  }
  const ingredientsOutput = ingredients.map(ig => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px auto",
          border: "1px solid #ccc",
          padding: "5px"
        }}
      >
        {ig.name}: {ig.amount}
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients {ingredientsOutput}</p>
      <p>
        Price: <strong>{props.price}</strong>
      </p>
    </div>
  );
};

export default order;
