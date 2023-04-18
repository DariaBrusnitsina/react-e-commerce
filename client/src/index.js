import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/main.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore } from './store/createStore';

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
  </BrowserRouter>
);
