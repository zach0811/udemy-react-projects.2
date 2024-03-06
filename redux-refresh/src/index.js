import ReactDOM from "react-dom/client";
import React from "react";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import { store } from "./components/store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
