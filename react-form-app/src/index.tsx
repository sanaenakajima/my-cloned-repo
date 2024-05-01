import React from 'react';
import { createRoot } from 'react-dom/client'; // createRootをインポート
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const container = document.getElementById('root'); // レンダリングする要素を取得

if (container) {
    const root = createRoot(container); // rootインスタンスを作成
    root.render( // root.renderメソッドを使用してレンダリング
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
} else {
    console.error('Failed to find the root element');
}
