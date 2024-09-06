import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './main/App';
import Login from './components/Login'
import Main from './components/Main'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/",
        element: <Main />,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
