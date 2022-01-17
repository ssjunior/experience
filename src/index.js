import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom";
import { Provider } from "react-redux";

import { getStates, initStore } from "tomato";

import App from "./App";
import MODULES from "./modules";

// Inicialização do estado (redux)
const modulesState = getStates(MODULES);
const customStates = {};
const state = { ...modulesState, ...customStates };
const STORE = initStore({ state });

createRoot(document.getElementById("root")).render(
  <Provider store={STORE}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
