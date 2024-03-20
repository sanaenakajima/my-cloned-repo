# html-css-js-curriculum

## 課題を実施する前に下記内容を確認する

- [ディレクトリが作成されているか](https://www.notion.so/apex-curriculum/Github-Clone-4afd33592c7348cca372d76013191a62)

## 課題について

コンテンツは 3 プログラム構成で実施していきます。

- `HTML-CSS`：全ての基礎となるマークアップを身につけるプログラムです。

- `JavaScript`：現代では必須となった JavaScript を現場ライクな形で学び、動的な処理や外部機能を利用し実装力をつけるプログラムです。

- `React`：フロントエンドエンジニアとしてさらに磨きをかけるため JavaScript のフレームワークである React を学び、より複雑な機能に対する実装力を身につけるプログラムです。


## 開発

課題の進め方は[github flow](https://atmarkit.itmedia.co.jp/ait/articles/1708/01/news015.html)で進めてください。

- master ブランチから新規ブランチを切る
- 新規ブランチで実装を進める
- git で適宜コミット
- github に push
- github 上で PR を作って、レビュー実施
  - PR の書き方は[こちら](https://hydrakecat.hatenablog.jp/entry/2018/06/30/%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC%E3%81%97%E3%81%A6%E3%82%82%E3%82%89%E3%81%84%E3%82%84%E3%81%99%E3%81%84PR%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9)を参考に
- レビューを実施した人がマージ

---

## React総合課題について
- React、Redux、tailwindCSS、NSWを使用して実際の開発にかなり近づけた課題となります。

## 課題を終えた時の姿

- React.js を利用した機能実装が一人称で進めれる
- TypeScript を用いて、型安全な実装を進めることができる
- 再利用性の高いコンポーネント実装ができる
- コンポーネント設計の代表である Atomic Design を理解している
- API を叩くという、非同期処理実装を理解している
- git/github を利用したチーム開発手順を理解している

### コンポーネント管理

コンポーネント管理に `Atomic Design` を採用します。

- components/
  - atoms
    - 最小単位のパーツ
    - 再利用できるように独自ロジックを持たない
  - molecules
    - atoms を組み合わせた 再利用パーツ群
    - 再利用できるように独自ロジックを持たない
  - organisms
    - atoms と molecules を組み合わせた 1 機能
    - 再利用性はあまり意識しなくて良い
    - 1 機能のためロジックの責任を持つ

※Atomic Design については[こちら](https://blog.spacemarket.com/code/atomic-design%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6react%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%82%92%E5%86%8D%E8%A8%AD%E8%A8%88%E3%81%97%E3%81%9F%E8%A9%B1/)を参照

※Atomic Design の template は今回採用していません
