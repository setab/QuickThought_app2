import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from './Pages/Login.tsx';
import Signin from './Pages/Signin.tsx';
import MainLayout from './Pages/MainLayout.tsx';
import Profile from './Pages/Profile.tsx';
import Home from './Pages/Home.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Main layout wrapping the child routes
    children: [
      {
        path: "/", // Home route
        element: <Home />
      },
      {
        path: "/profile", // Profile route
        element: <Profile />
      }
    ]
  },
  {
    path: "/login", // Login route
    element: <Login />
  },
  {
    path: "/signin", // Signin route
    element: <Signin />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
