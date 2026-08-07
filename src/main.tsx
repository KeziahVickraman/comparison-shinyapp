import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Handle third-party / cross-origin script errors gracefully
window.addEventListener('error', (event) => {
  if (event.message === 'Script error.' || event.message?.includes('disqus')) {
    // Prevent unhandled cross-origin script errors from bubbling up to developer overlays
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

