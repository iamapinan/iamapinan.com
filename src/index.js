import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCKOR-oUZGZdO2-4lKkmzY0TO6UxqWG99g",
  authDomain: "iobot-wnlrcf.firebaseapp.com",
  databaseURL: "https://iobot-wnlrcf.firebaseio.com",
  projectId: "iobot-wnlrcf",
  storageBucket: "iobot-wnlrcf.appspot.com",
  messagingSenderId: "857930725841",
  appId: "1:857930725841:web:8eb810d596d83761ee08f0"
};

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);