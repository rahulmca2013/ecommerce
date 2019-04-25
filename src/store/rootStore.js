import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
//import reducers
import reducers from "./reducers";
//logger
// const logger = store => {
//   return next => {
//     return action => {
//       console.log("Middleware", action);
//       const result = next(action);
//       console.log("State", store.getState());
//       return result;
//     };
//   };
// };
//creating strore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export default store;
