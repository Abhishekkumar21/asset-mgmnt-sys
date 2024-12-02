import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import './styles/global.css';
import './index.css';
import App from './App';
import { initMockServiceWorker } from './mocks/init-msw';

// Initialize mock service worker in development and production
initMockServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
