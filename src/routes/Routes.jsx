import Home from '../Pages/Home/Home'
import ErrorPage from '../Pages/ErrorPage'
import Login from '../Pages/Login/Login'
import SignUp from '../Pages/Signup/SignUp'
import Allscholarships from '../Pages/Allscholarships'
import PrivateRoute from './Privateroute'
import DashboardLayout from '../Layouts/DashboardLayout'
import AddScholarship from '../Pages/Dashboard/Admin/Addscholarship'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../Layouts/MainLayout'



import { createBrowserRouter } from 'react-router'
import Privateroute from './Privateroute'

import AboutUs from '../Pages/AboutUs'
import ContactUs from '../Pages/Contact'
import Details from '../Pages/Details'
import Payment from '../Pages/Payment'
import Paymentsuccess from '../Pages/paymentsuccess'
import MyApplications from '../Pages/Dashboard/Customer/MyApplications'
import ManageApplys from '../Pages/Dashboard/Moderator/ManageApplys'
import ManageScholarships from '../Pages/Dashboard/Admin/ManageScholarships'
import AllReviews from '../Pages/Dashboard/Moderator/AllReviews'
import MyReviews from '../Pages/Dashboard/Customer/MyReviews'
import Analytics from '../Pages/Dashboard/Admin/Analytics'


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
        path: '/scholarships/:id',
        element: <Details />,
      },
      {
          path:"/payment/:id",
         element: <Payment />,
        },
      {  path:"payment-success",
         element: <Paymentsuccess />},
    
        {
        path: '/allscholarships',
        element:<Allscholarships />
      },
        {
        path: '/aboutus',
        element:<AboutUs />
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
      {
        path: 'add-scholarship',
        element: (
          <PrivateRoute>
            <AddScholarship />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-scholarship',
        element: (
          <PrivateRoute>
            <ManageScholarships />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: 'analytics',
        element: (
          <PrivateRoute>
            <Analytics />
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
        path: 'my-applications',
        element: (
          <PrivateRoute>
            <MyApplications />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-applications',
        element: <ManageApplys />,
      },
      {
        path: 'all-reviews',
        element: <AllReviews />,
      },
      {
        path: 'my-reviews',
        element: <MyReviews />,
      },
  
    ],
  },
  
])