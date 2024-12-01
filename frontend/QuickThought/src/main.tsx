import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./Pages/Login";
import Signin from "./Pages/Signin";
import MainLayout from "./Pages/MainLayout";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
// import ProtectedRoute from "./components/ProtectedRoute"; // Import your ProtectedRoute
import { AuthProvider } from "./components/AuthProvider"; // Import your AuthProvider

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/", // Home route
        element: (
          // <ProtectedRoute>
            <Home />
          // </ProtectedRoute>
        ),
      },
      {
        path: "/profile", // Profile route
        element: (
          // <ProtectedRoute>
            <Profile />
          // </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login", // Login route
    element: <Login />,
  },
  {
    path: "/signin", // Signin route
    element: <Signin />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
