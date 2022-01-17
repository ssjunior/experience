import { prepareInitialState } from "tomato";

import { Products, Product, Cart } from "./views";
import { Home, Product as ProductLayout } from "./layouts";
import { PRODUCTS } from "./constants";

let cart = JSON.parse(localStorage.getItem("cart") || "{}");

const routes = [
  {
    moduleId: "store",
    admin: false,
    authenticated: false,
    path: "/",
    layout: Home,
    view: Products,
  },
  {
    moduleId: "store",
    admin: false,
    authenticated: false,
    path: "/cart",
    layout: ProductLayout,
    view: Cart,
  },
  {
    moduleId: "store",
    admin: false,
    authenticated: false,
    path: "/checkout",
    layout: Home,
    view: Products,
  },
  {
    moduleId: "store",
    admin: false,
    authenticated: false,
    path: "/login",
    layout: Home,
    view: Products,
  },
  {
    moduleId: "store",
    admin: false,
    authenticated: false,
    path: "/product/:id",
    layout: ProductLayout,
    view: Product,
  },
];

export const store = {
  id: "store",
  moduleId: "store",
  icon: "Cart",
  name: "Store",
  routes,
  initialState: prepareInitialState({ cart, objs: PRODUCTS }),
};
