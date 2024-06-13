//src/mocks/browser.js
import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

worker.start({
    onUnhandledRequest: (req) => {
      if (req.url.pathname === '/logo192.png') {
        // 特定のリクエストを無視する
        return;
      }
  
      // デフォルトの警告メッセージを表示する
      console.warn(
        `[MSW] Warning: captured a request without a matching request handler:\n\n  • ${req.method} ${req.url.href}\n\nIf you still wish to intercept this unhandled request, please create a request handler for it.\nRead more: https://mswjs.io/docs/getting-started/mocks`
      );
    },
  });