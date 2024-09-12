import * as React from 'react';
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../main/App";
import Login from "../components/Login";
import About from '../components/About';
import Schools from '../components/Schools';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = !!localStorage.getItem('userKey');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Schools />
          </ProtectedRoute>
        )
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sobre",
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        )
      },
    ]
  },
]);

export default router