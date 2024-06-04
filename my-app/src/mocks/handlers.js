// src/mocks/handlers.js
import { rest } from 'msw';

// ローカルストレージからユーザーデータを読み込む
const usersKey = 'mockUsers';
let users = JSON.parse(localStorage.getItem(usersKey)) || [];

const saveUsers = () => {
  localStorage.setItem(usersKey, JSON.stringify(users));
};

export const handlers = [
  rest.post('/user', async (req, res, ctx) => {
    const { name, email, password, password_confirmation, representative_image } = await req.json();

    const newUser = {
      user_id: `user_${Date.now()}`,
      name,
      email,
      password, // 実際にはハッシュ化されたパスワードを保存すべきです
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      representative_image,
      token: `token_${Date.now()}`
    };

    users.push(newUser);
    saveUsers(); // ユーザーを保存

    console.log('Registered users:', users);  // Debugging line

    return res(
      ctx.status(201),
      ctx.json(newUser)
    );
  }),

  rest.post('/login', async (req, res, ctx) => {
    const { email, password } = await req.json();

    // ログイン時にローカルストレージからユーザーを再読み込みする
    users = JSON.parse(localStorage.getItem(usersKey)) || [];
    console.log('Current users:', users);  // Debugging line
    console.log('Login attempt with:', { email, password });  // Debugging line

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      return res(
        ctx.status(200),
        ctx.json({ user })
      );
    } else {
      return res(
        ctx.status(404),
        ctx.json({ message: 'User not found' })
      );
    }
  }),
];
