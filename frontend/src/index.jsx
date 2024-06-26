// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Đảm bảo rằng file index.css hoặc các tệp css khác được import ở đây
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
