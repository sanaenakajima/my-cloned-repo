// src/mocks/handlers.js
import { rest } from 'msw';

// ローカルストレージキーの定義
const usersKey = 'mockUsers';
const articlesKey = 'mockArticles';

// ローカルストレージからデータを読み込む関数
const loadFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

// ローカルストレージにデータを書き込む関数
const saveToLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// データの初期化
let users = loadFromLocalStorage(usersKey);
let articles = loadFromLocalStorage(articlesKey);

// テスト用のユーザーデータを追加（必要に応じて既存のデータに追加）
const testUser = {
  user_id: 'example-user-id',
  name: 'リアクト太郎',
  email: 'react.tarou@example.com',
  password: 'password123',
  representative_image: '' // 画像がない場合をシミュレート
};

if (!users.some(user => user.user_id === testUser.user_id)) {
  users.push(testUser);
  saveToLocalStorage(usersKey, users);
}

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
    saveToLocalStorage(usersKey, users);

    return res(
      ctx.status(201),
      ctx.json(newUser)
    );
  }),

  rest.post('/login', async (req, res, ctx) => {
    const { email, password } = await req.json();

    users = loadFromLocalStorage(usersKey);
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

  rest.post('http://localhost:5000/articles', async (req, res, ctx) => {
    const { title, content } = await req.json();

    const newArticle = {
      article_id: `article_${Date.now()}`,
      title,
      content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    articles.push(newArticle);
    saveToLocalStorage(articlesKey, articles);

    return res(
      ctx.status(201),
      ctx.json(newArticle)
    );
  }),

  rest.get('/article', (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get('page')) || 1;
    const pageSize = 20;
    const paginatedArticles = articles.slice((page - 1) * pageSize, page * pageSize);

    return res(
      ctx.status(200),
      ctx.json({
        total: articles.length,
        per_page: pageSize,
        current_page: page,
        last_page: Math.ceil(articles.length / pageSize),
        first_page_url: `/article?page=1`,
        last_page_url: `/article?page=${Math.ceil(articles.length / pageSize)}`,
        next_page_url: page < Math.ceil(articles.length / pageSize) ? `/article?page=${page + 1}` : null,
        prev_page_url: page > 1 ? `/article?page=${page - 1}` : null,
        path: `/article`,
        from: (page - 1) * pageSize + 1,
        to: Math.min(page * pageSize, articles.length),
        data: paginatedArticles,
      })
    );
  }),

  // ユーザー情報取得のハンドラーを追加
  rest.get('/user/:userId', (req, res, ctx) => {
    const { userId } = req.params;
    const user = users.find(user => user.user_id === userId);

    if (user) {
      return res(
        ctx.status(200),
        ctx.json({
          name: user.name,
          email: user.email,
          representative_image: user.representative_image,
        })
      );
    } else {
      return res(
        ctx.status(404),
        ctx.json({ message: 'User not found' })
      );
    }
  }),

  // ユーザー情報更新のハンドラーを追加
  rest.put('/user/:userId', async (req, res, ctx) => {
    const { userId } = req.params;
    const { email, nickname, representative_image } = await req.json();

    users = loadFromLocalStorage(usersKey);
    const userIndex = users.findIndex(user => user.user_id === userId);

    if (userIndex === -1) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'User not found' })
      );
    }

    users[userIndex] = {
      ...users[userIndex],
      email,
      nickname,
      representative_image,
      updated_at: new Date().toISOString(),
    };
    
    saveToLocalStorage(usersKey, users);

    return res(
      ctx.status(204)
    );
  })
];


