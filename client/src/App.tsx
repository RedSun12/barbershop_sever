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
const { VITE_API } = import.meta.env;

function App() {
  const user = useAppSelector((store) => store.userSlice.user);
  const dispatch = useAppDispatch();
 


  useEffect(() => {
    dispatch(fetchRefresh())
      .then(unwrapResult)
      .then((result) => {
        setAccessToken(result.accessToken);
      });
  }, []);

 


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element: user.username ? (
            <HomePage />
          ) : (
            <div className='homP'>
            <p className='tableZOV'>Если хочешь попасть в таблицу лидеров, зарегистрируйся</p>
            <p className='imgZOV'><img src='/stal.jpg'></img></p>
            </div>
          ),
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
          element: <Admin />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
