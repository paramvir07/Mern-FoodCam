import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router";
import { ToastContainer } from "react-toastify"
import App from './App.jsx'
import Cart from './pages/user/Cart.jsx';
import UserLogin from './pages/auth/user/UserLogin.jsx';
import Home from './pages/Home.jsx';
import PartnerLogin from './pages/auth/partner/PartnerLogin.jsx';
import PartnerHome from './pages/partner/PartnerHome.jsx';
import Logout from './pages/auth/Logout.jsx';
import UserRegister from './pages/auth/user/UserRegister.jsx';
import PartnerRegister from './pages/auth/partner/PartnerRegister.jsx';
import AddFood from './pages/partner/AddFood.jsx';
import EditFood from './pages/partner/EditFood.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:  <App />,
    children: [
      {
        index: true, element: <Home />,
      },
      {
        path: "/user/cart", element:  <Cart />,
      },
      {
        path: "/partner/home", element:  <PartnerHome/>,
      },
      {
        path: "/partner/addfood", element:  <AddFood/>,
      },
      {
        path: "/partner/editfood/:foodId", element:  <EditFood/>,
      },
    ]
  },
  {
    path: "/user/register", element:  <UserRegister />,
  },
  {
    path: "/user/login", element:  <UserLogin />,
  },
  {
    path: "/partner/login", element:  <PartnerLogin />,
  },
  {
    path: "/partner/register", element:  <PartnerRegister />,
  },
  {
    path: "/logout", element:  <Logout />,
  },
  
  
  
]);

createRoot(document.getElementById('root')).render(
  <>
  <RouterProvider router={router} />
  <ToastContainer position="top-center"/>
  </>
)
