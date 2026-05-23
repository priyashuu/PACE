import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const MIN_LOADER_TIME = 11000; // 10 seconds

const startTime = Date.now();

function renderApp() {
  const elapsed = Date.now() - startTime;
  const remaining = MIN_LOADER_TIME - elapsed;
  
  if (remaining > 0) {
    setTimeout(renderApp, remaining);
  } else {
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }
}

renderApp();
