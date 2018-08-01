import * as AT from "./Orders";

const MAX_INGREDIENT = 3;
const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initState = {
  ingredients: { cheese: 0, salad: 0, bacon: 0, meat: 0 },
  totalPrice: 4.0
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case AT.ADD_INGREDIENT:
      return addIngredientHandler(state, action);
    case AT.REMOVE_INGREDIENT:
      return removeIngredientHandler(state, action);
    default:
      return state;
  }
};

// add ingredient to burger
const addIngredientHandler = (state, action) => {
  const ingType = action.ingType;
  if (state.ingredients[ingType] >= MAX_INGREDIENT) {
    return state;
  }

  return {
    // clone top level state content
    ...state,
    ingredients: {
      // clone ingredients
      ...state.ingredients,
      [ingType]: state.ingredients[ingType] + 1
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICE[ingType]
  };
};

// remove ingredient from burger
const removeIngredientHandler = (state, action) => {
  const ingType = action.ingType;
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [ingType]: state.ingredients[ingType] - 1
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICE[ingType]
  };
};

export default reducer;
