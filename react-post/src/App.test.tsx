//src/App.test
import React from 'react';
import { render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store/store';
import App from './App';

describe.skip('App Tests', () => {
test('アプリ全体が正しくレンダリングされるか', () => {
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
  });
});
});