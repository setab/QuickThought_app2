import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./Pages/Login";
import Signin from "./Pages/Signin";
import MainLayout from "./Pages/MainLayout";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthProvider"; // Import your AuthProvider
import NotFound from "./components/NotFound"; // Import your existing 404 component

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/", // Home route
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile", // Profile route
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
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
  {
    path: "*", // Catch-all route for undefined paths
    element: <NotFound />, // Render your 404 component here
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
