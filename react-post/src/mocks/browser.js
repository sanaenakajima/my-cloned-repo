// src/mocks/browser.js
import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

worker.start({
  onUnhandledRequest: (req, print) => {
    if (req.url.pathname.startsWith('/icons')) {
      // アイコンのリクエストを無視
      return;
    }

    // デフォルトの警告メッセージを表示する
    print.warning();
  },
});
