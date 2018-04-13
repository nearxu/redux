import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reducer from "./reducers";
import App from "./containers/app";
import Index from "./containers/index";

const middleware = [thunk];
// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger())
// }

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
);
store.subscribe(listener);
function listener() {
  let newState = store.getState();
  console.log(newState, "newState");
}
render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById("root")
);
