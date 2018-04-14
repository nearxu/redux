import React, { Component } from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers.js";
import App from "./app.js";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(listener);
function listener() {
  let newState = store.getState();
  console.log(newState, "newStatet");
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
