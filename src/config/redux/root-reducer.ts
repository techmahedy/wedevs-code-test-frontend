import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import loginReducer from "../../modules/auth/redux/login/login.reducer";
import alertReducer from "../../redux/alert/alert.reducer";
import LocalizeReducer from "../../redux/localize/localize.reducer";
import registerReducer from "../../modules/auth/redux/register/register.reducer";
import productReducer from "../../modules/product/redux/product.reducer";
import orderReducer from "../../modules/buyer/redux/order.reducer";
import notificationReducer from "../../modules/admin/redux/notification.reducer";
import activityReducer from "../../redux/activity/activity.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "loginState",
    "registerState"
  ],
};

const appReducer = combineReducers({
  loginState: loginReducer,
  registerState: registerReducer,
  localizeState: LocalizeReducer,
  alertState: alertReducer,
  productState: productReducer,
  orderState: orderReducer,
  notificationState: notificationReducer,
  activityState: activityReducer,
});

const rootReducer = (state: any, action: any) => {
  if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', 'en')
  }
  if (action.type === "LOG_OUT") {
    storage.removeItem("persist:root");
    storage.removeItem("token");
    storage.removeItem("error");
    state = undefined;
  }
  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
