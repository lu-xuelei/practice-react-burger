import * as AT from "../actions/ActionTypes";
import { updateObject } from "../utilities/Utilities";

const initState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case AT.CHECKOUT_START:
      return checkoutStart(state, action);
    case AT.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case AT.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case AT.PURCHASE_BURGER_FAILED:
      return purchaseBurgerFailed(state, action);
    default:
      return state;
  }
};

const checkoutStart = (state, action) => {
  return updateObject(state, {
    purchased:false
  });
}

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, {
      loading: true
    });
  };
  
const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderdData,
    id: action.orderId
  };
  return updateObject(state, {
    orders: state.orders.concat(newOrder),
    loading: false,
    purchased: true
  });
};

const purchaseBurgerFailed = (state, actoin) => {
  return updateObject(state, {
    loading: false,
    purchased:true
  });
};

export default reducer;