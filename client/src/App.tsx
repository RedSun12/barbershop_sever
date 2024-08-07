import './App.css';
import Root from './Root';
import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { setAccessToken } from './axiosInstance';
import SignupPage from './pages/SignupPage/SignupPage';
import SigninPage from './pages/SigninPage/SigninPage';
import HomePage from './pages/HomePage/HomePage';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchRefresh } from './redux/thunkActions';
import { unwrapResult } from '@reduxjs/toolkit';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import EditUser from './pages/EditUser/EditUser';
import axiosInstance from './axiosInstance';
import Services from './pages/Service/Services';
import Contacts from './pages/Contacts/Contacts';
import Admin from './pages/Admin/Admin';
import ProductPage from './pages/ProductPage/ProductPage';
import BusketPage from './pages/BusketPage/BusketPage';
import MoreCard from './pages/MoreCard/MoreCard';
const { VITE_API } = import.meta.env;

function App() {
  const user = useAppSelector((store) => store.userSlice.user);
  const dispatch = useAppDispatch();
//  const navigate = useNavigate()


  useEffect(() => {
    dispatch(fetchRefresh())
      // .then(unwrapResult)
      // .then((result) => {
      //   setAccessToken(result.accessToken);
      // });
  }, []);

 


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },

        {
          path: '/signin',
          element: <SigninPage />,
        },
        {
          path: '/signup',
          element: <SignupPage />,
        },
        {
          path: '/profile',
          element: <ProfilePage />,
        },
        {
          path: '/contact',
          element: <Contacts />,
        },
        {
          path: '/product',
          element: <ProductPage />,
        },
        {
          path: '/edituser/:id',
          element: <EditUser />,
        },
        {
          path: '/services',
          element: <Services />,
        
        },
         {
          path: '/admin',
          // element: user.id === 1 ? <Admin /> : <ProductPage/>,
          element:  <Admin /> ,
        },
        {
          path: '/busket',
          element: <BusketPage />,
        },
        {
          path: '/more',
          element: <MoreCard />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
