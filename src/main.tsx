import React from "react";
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './index.css'
import App from './App.tsx'

import { Provider } from "react-redux";
import { store } from './redux/store.ts';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer position="top-right" autoClose={2000} />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
