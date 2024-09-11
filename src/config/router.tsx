import * as React from 'react';
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../main/App";
import Main from "../components/Main";
import Login from "../components/Login";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: JSX.Element;
}

const ProtectedRoute = ({ isAuthenticated, children }: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const isAuthenticated = !!localStorage.getItem('userKey');

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Main />
          </ProtectedRoute>
        )
      },
      {
        path: "/login",
        element: <Login />,
      },
    ]
  },
]);

export default router