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
import UpdateScholarship from '../Pages/Dashboard/Admin/UpdateScholarship'
import AdminRoute from './AdminRoute'
import ModeratorRoute from './ModeratorRoute'


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
         element:(<PrivateRoute>
          <Payment />
         </PrivateRoute>)
          ,
        },
      {  path:"payment-success",
         element:(<PrivateRoute>
             <Paymentsuccess />
         </PrivateRoute>)
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
        path: 'add-scholarship',
        element: (
          <PrivateRoute>
            <AdminRoute>
                    <AddScholarship />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-scholarship',
        element: (
          <PrivateRoute>
            <AdminRoute>  
               <ManageScholarships />
               </AdminRoute>
         
          </PrivateRoute>
        ),
      },
            {
  path: 'updatescholarship/:id',
  element: (
    <PrivateRoute>
      <AdminRoute>
         <UpdateScholarship />
         </AdminRoute>
  
    </PrivateRoute>
  ),
},

      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <AdminRoute>
               <ManageUsers />
               </AdminRoute>
           
          </PrivateRoute>
        ),
      },
      {
        path: 'analytics',
        element: (
          <PrivateRoute>
            <AdminRoute> 
               <Analytics />
            </AdminRoute>
          
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
        element: (
        <PrivateRoute>
          <ModeratorRoute>
            <ManageApplys />
            </ModeratorRoute>
        </PrivateRoute>
        ),
      },
      {
        path: 'all-reviews',
        element:  (  <PrivateRoute>
          <ModeratorRoute>
            <AllReviews />
            </ModeratorRoute>
        </PrivateRoute>
        ),
      },
      {
        path: 'my-reviews',
        element:(
        <PrivateRoute> 
          <MyReviews />
          </PrivateRoute>
       )
        ,
      },

  
    ],
  },
  
])