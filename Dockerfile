# Dockerfile for frontend

# ベースイメージを指定します（例：Node.js）
FROM node:14

# 作業ディレクトリを設定します
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピーします
COPY package*.json ./

# 依存関係をインストールします
RUN npm install

# アプリケーションコードをコピーします
COPY . .

# アプリケーションをビルドします
RUN npm run build

# 環境変数を設定してアプリケーションを起動します
ENV REACT_APP_API_URL=http://${BACKEND_HOST}:5000

# アプリケーションを起動します
CMD ["npm", "start"]
