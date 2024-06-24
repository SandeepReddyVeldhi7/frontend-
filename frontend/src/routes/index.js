import { createBrowserRouter} from "react-router-dom"
import Home from "../pages/Home.js"
import App from "../App"
import Login from "../pages/Login.js"
import ForgotPassword from "../pages/ForgotPassword.js";
import SignUp from "../pages/SignUp.js";
import AdminPanel from "../pages/AdminPanel.js";
import AllUser from "../pages/AllUser.js";
import AllProducts from "../pages/AllProducts.js";
import ProductDetails from "../pages/ProductDetails.js";
import Cart from "../pages/Cart.js";
import SearchProduct from "../pages/SearchProduct.js";
const app = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
     
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "search",
        element: <SearchProduct />,
      },

      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUser />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
        ],
      },
    ],
  },
]);
export default app