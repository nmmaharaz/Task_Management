import { createBrowserRouter } from "react-router-dom";
import Home from "../Page/Home";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
    },
    {
        path:"/signup",
        element:<SignUp></SignUp>
    },
    {
        path:"/signin",
        element:<Login></Login>
    }
  ]);