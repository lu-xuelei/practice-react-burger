import * as AT from "./ActionTypes";
import axios from "../../axios-orders";

export const fetchOrdersSuccess = fetchedOrders => {
  return {
    type: AT.FETCH_ORDERS_SUCCESS,
    orders: fetchedOrders
  };
};

export const fetchOrdersFailed = error => {
  return {
    type: AT.FETCH_ORDERS_FAILED,
    erro: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: AT.FETCH_ORDERS_START
  };
};

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios
      .get("/orders.json")
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFailed(err));
      });
  };
};
