# date-course-React

DateCourses のフロントエンド（React + TypeScript SPA）。

## 環境変数 / フィーチャーフラグ

`.env`（gitignore 済み）で設定する。雛形は `.env.example` を参照。

| 変数 | 用途 |
|---|---|
| `REACT_APP_GOOGLE_MAP_API_KEY` | Google Maps（地図・経路） |
| `REACT_APP_BACKEND_DOMAIN_API` | バックエンドAPIのベースURL（Nginx 経由で Rails / Go 切替） |
| `REACT_APP_ENABLE_REVIEWS` | レビュー・評価・人気ランキングUIの表示フラグ |

### レビュー機能は本番では非表示（設計上の判断）

デートスポットは HotPepper グルメAPIから取得した **実在・実名の店舗**です。これに
アプリ独自のユーザーレビュー（＝第三者による評価）を**公開**すると、事実に基づかない
評価が実在店に紐づき、**信用毀損・風評被害のリスク**があります（食べログ/ぐるなび等の
評価APIは取得不可のため、HotPepper由来データに正当な評価を載せることもできません）。

そのため **レビュー・評価（星）・人気ランキングUI は本番では非表示**にしています。

- 制御: `src/config/features.ts` の `REVIEWS_ENABLED`（`REACT_APP_ENABLE_REVIEWS === 'true'`）
- **本番**: この変数を設定しない → `false` → 非表示（実名店に評価を出さない）
- **ローカル/デモ**: `.env` に `REACT_APP_ENABLE_REVIEWS=true` を設定 → レビュー機能をデモ表示
- 適用箇所: 一覧/詳細の星・「レビューN件」、詳細のレビュー投稿欄、人気ランキング

実在店の正確な情報・口コミは、各スポットの **HotPepper 店舗ページ（`maps_url`）への導線**で
本家へ誘導する方針とする。

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
