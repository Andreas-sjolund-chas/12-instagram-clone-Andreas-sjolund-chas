import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleWare from "redux-thunk";

import reducer from "./reducers";

import { App } from "./components";
import "./index.css";

let store = createStore(reducer, applyMiddleware(thunkMiddleWare));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
