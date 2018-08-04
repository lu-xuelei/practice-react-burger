import * as AT from "./ActionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: AT.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFailed = error => {
  return {
    type: AT.PURCHASE_BURGER_FAILED,
    erro: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: AT.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailed(error));
      });
  };
};

export const checkoutStart = () => {
  return {
    type: AT.CHECKOUT_START
  }
}
