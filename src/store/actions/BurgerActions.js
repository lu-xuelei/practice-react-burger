import * as AT from "./ActionTypes";
import axios from '../../axios-orders';

export const addIngredient = ingName => {
  return {
    type: AT.ADD_INGREDIENT,
    ingredientName: ingName
  };
};

export const removeIngredient = ingName => {
  return {
    type: AT.REMOVE_INGREDIENT,
    ingredientName: ingName
  };
};

export const setIngredients = initOrder => {
  return {
    type: AT.SET_INGREDIENTS,
    ingredients: initOrder.ingredients,
    totalPrice: initOrder.price
  };
};

export const fetchIngredientsFailed = () => {
    return {
        type: AT.FETCH_INGREDIENTS_FAILED
    }
}
export const initIngredients = () => {
  return dispatch => {
    axios
      .get("/initOrder.json")
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
          console.log("failed...")
        dispatch(fetchIngredientsFailed())
      });
  };
};
