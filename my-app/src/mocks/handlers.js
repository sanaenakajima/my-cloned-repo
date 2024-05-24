// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.post('/user', async (req, res, ctx) => {
    try {
      const text = await req.text();
      const body = JSON.parse(text);
      const { email, password, password_confirmation, representative_image } = body;

      if (email === 'error@example.com') {
        return res(
          ctx.status(500),
          ctx.json({ message: 'サーバーエラーが発生しました。' })
        );
      }

      return res(
        ctx.status(201),
        ctx.json({ message: '登録成功', email, password, password_confirmation, representative_image })
      );
    } catch (error) {
      return res(
        ctx.status(500),
        ctx.json({ message: 'サーバーエラーが発生しました。' })
      );
    }
  }),
];
