import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SessionProvider } from './SessionContext'; // <-- c'est le bon composant

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionProvider> {/* Utilise le provider ici */}
      <App />
    </SessionProvider>
  </React.StrictMode>
);

reportWebVitals();
