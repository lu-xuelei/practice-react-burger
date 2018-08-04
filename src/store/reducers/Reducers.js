import {combineReducers} from 'redux';

import burderReducer from './BurgerReducer';
import purchaseReducer from './PurchaseReducer';
import ordersReducer from './OrdersReducer';

const reducers = combineReducers({
  burger: burderReducer,
  purchase: purchaseReducer,
  orders: ordersReducer
})

export default reducers;