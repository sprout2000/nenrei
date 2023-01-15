import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { registerSW } from 'virtual:pwa-register';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

registerSW();
