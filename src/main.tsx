import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import AgeVerification from './AgeVerification.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AgeVerification/>
    <App />
  </StrictMode>
);
