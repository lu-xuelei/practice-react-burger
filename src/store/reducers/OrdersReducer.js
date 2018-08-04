import * as AT from "../actions/ActionTypes";
import { updateObject } from "../utilities/Utilities";

const initState = {
  orders: [],
  loading: false
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case AT.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case AT.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case AT.FETCH_ORDERS_FAILED:
      return fetchOrdersFailed(state, action);
    default:
      return state;
  }
};

const fetchOrdersStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  });
};

const fetchOrdersFailed = (state, actoin) => {
  return updateObject(state, {
    loading: false
  });
};

export default reducer;
