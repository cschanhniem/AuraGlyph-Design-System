import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '@/styles/quantum.css';
import '@/styles/quantum-theme.css';

// Create root element if it doesn't exist
const rootElement = document.getElementById('root') || document.createElement('div');
if (!rootElement.id) {
  rootElement.id = 'root';
  document.body.appendChild(rootElement);
}

// Initialize the app with quantum styles
document.documentElement.classList.add('quantum-theme');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
