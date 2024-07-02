// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { SetupWorkerApi, MockedRequest } from 'msw'; // 追加

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser') as { worker: SetupWorkerApi };
  worker.start({
    onUnhandledRequest: (req: MockedRequest, print: { warning: (message: string) => void }) => {
      if (req.url.pathname.startsWith('/icons') || req.url.pathname === '/logo192.png') {
        // アイコンのリクエストを無視
        return;
      }

      // デフォルトの警告メッセージを表示
      print.warning(
        `[MSW] Warning: captured a request without a matching request handler:\n\n  • ${req.method} ${req.url.href}\n\nIf you still wish to intercept this unhandled request, please create a request handler for it.\nRead more: https://mswjs.io/docs/getting-started/mocks`
      );
    },
  });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
