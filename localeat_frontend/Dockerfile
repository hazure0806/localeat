# Node.jsの公式イメージをベースに使用
FROM node:latest

# アプリケーションディレクトリを設定
WORKDIR /app

# package.json と yarn.lock をコピー
COPY package.json yarn.lock ./

# 依存関係をインストール
RUN yarn install

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションがリッスンするポートを指定
EXPOSE 3000

# アプリケーションを起動
CMD ["yarn", "start"]
