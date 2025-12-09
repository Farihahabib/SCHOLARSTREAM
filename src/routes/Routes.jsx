import Home from '../Pages/Home/Home'
import ErrorPage from '../Pages/ErrorPage'
import Login from '../Pages/Login/Login'
import SignUp from '../Pages/Signup/SignUp'
import Allscholarships from '../Pages/Allscholarships'
import PrivateRoute from './Privateroute'
import DashboardLayout from '../Layouts/DashboardLayout'
// import AddPlant from '../Pages/Dashboard/Seller/AddPlant'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../Layouts/MainLayout'
// // import MyInventory from '../pages/Dashboard/Seller/MyInventory'
// // import ManageOrders from '../pages/Dashboard/Seller/ManageOrders'

import { createBrowserRouter } from 'react-router'
import Privateroute from './Privateroute'
import MyOrders from '../Pages/Dashboard/Customer/MyOrders'
import AboutUs from '../Pages/AboutUs'
import ContactUs from '../Pages/Contact'
import Details from '../Pages/Details'
import Payment from '../Pages/Payment'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/scholarship/:id',
        element: <Details />,
      },
        {
        path: '/allscholarships',
        element:<Allscholarships />
      },
        {
        path: '/aboutus',
        element:<AboutUs />
      },
        {
        path: '/payment',
        element:<Payment />
      },
        {
        path: '/contactus',
        element:<ContactUs />
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
 
  {
    path: '/dashboard',
    element: (
      <Privateroute>
        <DashboardLayout />
      </Privateroute>
    ),
    children: [
      {
        index: true,
        element: (
          <Privateroute>
            <Statistics />
          </Privateroute>
        ),
      },
      // {
      //   path: 'add-plant',
      //   element: (
      //     <PrivateRoute>
      //       <AddPlant />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: 'my-inventory',
      //   element: (
      //     <PrivateRoute>
      //       <MyInventory />
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      // {
      //   path: 'manage-orders',
      //   element: <ManageOrders />,
      // },
  
    ],
  },
  
])