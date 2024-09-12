import * as React from 'react';
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../main/App";
import Main from "../components/Main";
import Login from "../components/Login";

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