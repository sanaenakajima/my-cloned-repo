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
    const { title, content, user_name, user_id } = await req.json();

    const newArticle = {
      article_id: Date.now(), // ユニークな整数IDを生成
      title,
      content,
      user_name, // ユーザー名を利用
      user_id, // ユーザーIDを利用
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

  rest.get('http://localhost:5000/articles', (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get('page')) || 1;
    const pageSize = 15;
    const paginatedArticles = articles.slice((page - 1) * pageSize, page * pageSize);

    return res(
      ctx.status(200),
      ctx.json({
        total: articles.length,
        per_page: pageSize,
        current_page: page,
        last_page: Math.ceil(articles.length / pageSize),
        first_page_url: `/articles?page=1`,
        last_page_url: `/articles?page=${Math.ceil(articles.length / pageSize)}`,
        next_page_url: page < Math.ceil(articles.length / pageSize) ? `/articles?page=${page + 1}` : null,
        prev_page_url: page > 1 ? `/articles?page=${page - 1}` : null,
        path: `/articles`,
        from: (page - 1) * pageSize + 1,
        to: Math.min(page * pageSize, articles.length),
        data: paginatedArticles,
      })
    );
  }),

  // ユーザー情報取得のハンドラーを追加
  rest.get('http://localhost:3000/user/:userId', (req, res, ctx) => {
    const { userId } = req.params;
    const user = users.find(user => user.user_id === userId);

    if (user) {
      return res(
        ctx.status(200),
        ctx.json({
          user_id: user.user_id,
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

  // 記事詳細取得のハンドラーを追加
  rest.get('http://localhost:5000/articles/:article_id', (req, res, ctx) => {
    const { article_id } = req.params;
    const article = articles.find(article => article.article_id === parseInt(article_id, 10));

    if (article) {
      return res(
        ctx.status(200),
        ctx.json(article)
      );
    } else {
      return res(
        ctx.status(404),
        ctx.json({ message: 'Article not found' })
      );
    }
  }),

  // 記事更新のハンドラーを追加
  rest.put('http://localhost:5000/articles/:article_id', async (req, res, ctx) => {
    const { article_id } = req.params;
    const { title, content, user_id } = await req.json();
    const articleIndex = articles.findIndex(article => article.article_id === parseInt(article_id, 10));

    if (articleIndex === -1) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'Article not found' })
      );
    }

    const user = users.find(user => user.user_id === user_id);
    if (!user) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'User not found' })
      );
    }

    articles[articleIndex] = {
      ...articles[articleIndex],
      title,
      content,
      user_name: user.name, // 最新のユーザー名を更新
      updated_at: new Date().toISOString(),
    };

    saveToLocalStorage(articlesKey, articles);

    return res(
      ctx.status(200),
      ctx.json(articles[articleIndex])
    );
  }),

  // 記事削除のハンドラーを追加
  rest.delete('http://localhost:5000/articles/:article_id', (req, res, ctx) => {
    const { article_id } = req.params;
    articles = articles.filter(article => article.article_id !== parseInt(article_id, 10));

    saveToLocalStorage(articlesKey, articles);

    return res(
      ctx.status(204)
    );
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
      name: nickname, // ニックネームをユーザー名として使用
      representative_image,
      updated_at: new Date().toISOString(),
    };
    
    saveToLocalStorage(usersKey, users);

    return res(
      ctx.status(204)
    );
  }),
];



