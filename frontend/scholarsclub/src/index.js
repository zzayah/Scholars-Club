import React from 'react';
import ReactDOM from 'react-dom/client'; // Corrected import for ReactDOM in React 18
import './index.css';
import Create from './create';
import App from './App';
import Login from './login'
import Account, {
  loader as accLoad,
} from "./account";
import Thread, {
  loader as threadLoad,
} from "./thread";
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create',
    element: <Create />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  // {
  //   path: '/account',
  //   element: <Account />,
  // },
  {
    path: '/account/:username',
    element: <Account />,
    loader: accLoad
  },
  {
    path: '/threads/:tid',
    element: <Thread />,
    loader: threadLoad
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
