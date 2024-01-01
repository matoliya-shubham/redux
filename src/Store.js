import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
// import { composeWithDevTools } from "redux-devtools-extension"

//account and customer are them name of state
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
// for dev tools
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
