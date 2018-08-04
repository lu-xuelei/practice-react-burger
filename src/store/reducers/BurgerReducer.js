import * as AT from "../actions/ActionTypes";
import { updateObject } from "../utilities/Utilities";

const MAX_INGREDIENT = 3;
const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initState = {
  ingredients: null,
  totalPrice: 0,
  error: false
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case AT.ADD_INGREDIENT:
      return addIngredient(state, action);
    case AT.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case AT.SET_INGREDIENTS:
      return setIngredients(state, action);
    case AT.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

// add ingredient to burger
const addIngredient = (state, action) => {
  const ingName = action.ingredientName;
  if (state.ingredients[ingName] >= MAX_INGREDIENT) {
    return state;
  }

  const updatedIngredients = updateObject(state.ingredients, {
    [ingName]: state.ingredients[ingName] + 1
  });
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICE[ingName]
  };
  return updateObject(state, updatedState);
};

// remove ingredient from burger
const removeIngredient = (state, action) => {
  const ingName = action.ingredientName;
  const updatedIngredients = updateObject(state.ingredients, {
    [ingName]: state.ingredients[ingName] - 1
  });
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICE[ingName]
  };
  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
  const updatedState = {
    ingredients: action.ingredients,
    totalPrice: +action.totalPrice,
    error: false
  };
  return updateObject(state, updatedState);
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, {error: true});
};

export default reducer;
