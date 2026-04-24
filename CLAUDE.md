# date-course-react

デートコース・デートスポットの企画・閲覧・管理を行うReact SPA。

## 技術スタック

| カテゴリ | 技術 |
|--------|------|
| フレームワーク | React 18 + TypeScript 5 |
| ルーティング | React Router DOM v6 |
| 状態管理 | Redux Toolkit + redux-persist（localStorage永続化） |
| API通信 | axios + axios-case-converter（スネーク/キャメル自動変換） |
| スタイリング | Tailwind CSS + tailwind-styled-components |
| 地図 | @vis.gl/react-google-maps |
| ビルド | craco（Create React Appカスタマイズ） |

## ディレクトリ構成

```
src/
├── components/       # UIコンポーネント（Atomic Design）
│   ├── atoms/        # 最小UI要素
│   ├── molecules/    # atomsの組み合わせ
│   ├── organisms/    # moleculesの組み合わせ
│   ├── pages/        # ルート対応ページ
│   └── templates/    # ページレイアウトテンプレート
├── router/           # ルーティング定義
├── reducers/         # Redux スライス・ストア
├── hooks/            # カスタムフック
├── lib/api/          # Axiosクライアント設定
├── types/            # TypeScript型定義
├── datas/            # マスターデータ（都道府県・ジャンルなど）
└── defaults/         # Reduxステート初期値
```

---

## src/ 各ディレクトリ詳細

### components/ — UIコンポーネント

**Atomic Design**の5層構造で管理。

#### atoms/
最小単位のUI要素。他コンポーネントに依存しない。

| サブディレクトリ | 内容 |
|---------------|------|
| `button/` | ベースボタン（BaseButton等） |
| `card/` | カード要素 |
| `form/` | 入力フォーム要素 |
| `imageLayouts/` | 画像表示コンポーネント |
| `Link/` | リンクコンポーネント |
| `message/` | フラッシュメッセージ等 |
| `select/` | セレクトボックス |
| `text/` | テキスト表示 |

#### molecules/
atomsを組み合わせた小さな機能単位。

| サブディレクトリ | 内容 |
|---------------|------|
| `form/` | フォームのグループ |
| `header/` | ヘッダー内要素 |
| `maps/` | Google Map関連コンポーネント |
| `searchs/` | 検索フォーム等 |
| `select/` | セレクトの複合コンポーネント |

#### organisms/
moleculesを組み合わせた大きな機能単位。ページの主要セクションを担う。

| サブディレクトリ | 内容 |
|---------------|------|
| `area/` | エリア表示・選択UI |
| `card/` | カードリスト表示 |
| `layout/` | レイアウト骨格（Header等） |
| `menu/` | ナビゲーションメニュー |
| `rankings/` | ランキング表示 |
| `searchs/` | 検索バー |

#### pages/
React RouterのURLと1対1対応するページコンポーネント。APIデータ取得やUI制御はここで行う。

| サブディレクトリ | 対応URL |
|---------------|--------|
| `courses/` | `/courses/*` |
| `dateSpots/` | `/dateSpots/*` |
| `genres/` | `/genres/*` |
| `homes/` | `/`（トップページ） |
| `managementCourses/` | `/managementCourse/*`（コース作成） |
| `prefectures/` | `/prefectures/*` |
| `sessions/` | `/login` |
| `users/` | `/users/*` |
| `Loading.tsx` | ローディング画面 |
| `Page404.tsx` | 404ページ |

#### templates/
ページ全体のレイアウト骨格。Header固定などの共通構造を定義。

| サブディレクトリ | 内容 |
|---------------|------|
| `courses/` | コースページのレイアウト |
| `dateSpots/` | デートスポットページのレイアウト |
| `layouts/` | HeaderLayout（全ページ共通） |
| `reviews/` | レビューフォームのレイアウト |
| `users/` | ユーザーページのレイアウト |

---

### router/ — ルーティング定義

React Router v6を使用。機能ドメインごとにファイルを分割。

| ファイル | 役割 |
|--------|------|
| `Routers.tsx` | メインルータ。全ルートを集約 |
| `CourseRoutes.tsx` | コース関連ルート |
| `DateSpotRoutes.tsx` | デートスポット関連ルート（管理者のみNew/Edit） |
| `UserRoutes.tsx` | ユーザー関連ルート（本人のみEdit） |
| `ManagementCourseRoutes.tsx` | コース作成フロー |
| `GenreRoutes.tsx` | ジャンル関連ルート |
| `PrefectureRoutes.tsx` | 都道府県関連ルート |
| `HeaderBottomRoutes.tsx` | ヘッダー下部ナビゲーション定義 |
| `HeaderTopLeftRoutes.tsx` | ヘッダー上部左側ナビゲーション定義 |

**認可ロジック:** 各ルートファイル内でRedux stateを参照し、条件を満たさない場合は`<Navigate to="/" />`でリダイレクト＋エラーメッセージ表示。

---

### reducers/ — Redux状態管理

| ファイル | 管理する状態 |
|--------|------------|
| `index.ts` | Storeのセットアップ（combineReducers + redux-persist） |
| `loginSlice.ts` | `loginStatus: boolean`, `currentUser: User` |
| `currentDateCourseSlice.ts` | `managementCourse`（作成中コース）, `courseInfo`（移動手段・公開設定） |

`session`と`currentDateCourse`はどちらもlocalStorageに永続化される。

---

### hooks/ — カスタムフック

ビジネスロジック（API呼び出し＋Redux dispatch＋navigate）をカプセル化。

| ファイル | 処理 |
|--------|------|
| `users/useLoginAuthAction.tsx` | ログイン（POST /login → dispatch → navigate） |
| `users/useLogoutAction.tsx` | ログアウト |
| `users/useDeactivateAccountButtonAction.tsx` | アカウント削除 |
| `managementCourses/useCourseReset.tsx` | コース作成ステートの初期化 |

---

### lib/api/ — APIクライアント

`client.ts`でAxiosインスタンスを2つ公開。

```typescript
client          // JSON通信（Content-Type: application/json）
formDataClient  // ファイルアップロード（Content-Type: multipart/form-data）
```

`axios-case-converter`により、リクエスト時にキャメルケース→スネークケース、レスポンス時にスネークケース→キャメルケースへ自動変換される。

環境変数:
- `REACT_APP_BACKEND_DOMAIN_API` — バックエンドAPIのベースURL
- `REACT_APP_GOOGLE_MAP_API_KEY` — Google Maps APIキー

---

### types/ — TypeScript型定義

ドメインごとにサブディレクトリを分割。

| ディレクトリ | 主な型 |
|-----------|-------|
| `users/` | `User`, `LoginState`, `SignInParams` |
| `courses/` | `CourseData` |
| `dateSpots/` | `DateSpotData`（座標・レビュー集計情報を含む） |
| `dateSpotReviews/` | `DateSpotReviewData` |
| `managementCourses/` | `ManagementCourseData`, `CourseInfoData`, `CurrentDateCourseState` |
| `homes/` | ホーム画面用データ型 |
| `datas/` | `Prefecture`, `Area`, `Genre`, `BusinessTime`（マスターデータ型） |

---

### datas/ — マスターデータ

APIから取得せずフロントエンドで保持する定数データ。

| ファイル | 内容 |
|--------|------|
| `prefectureDatas.ts` | 全47都道府県（id, name, areaId） |
| `areaDatas.ts` | 日本6地域区分（北海道・東北/関東/中部/関西/中国・四国/九州・沖縄） |
| `genreDatas.ts` | デートスポットのジャンル一覧 |
| `businessTimeDatas.ts` | 営業時間の時刻選択肢 |
| `defaultDateSpotData.ts` | DateSpotの初期値オブジェクト |
| `defaultUserData.ts` | Userの初期値オブジェクト |

---

### defaults/ — Redux初期値

Redux Storeの初期状態を定義するファイル。Storeのsetup時・resetフック時に参照。

| ファイル | 内容 |
|--------|------|
| `userDefaults.ts` | `initialUser` |
| `dateCourseDefaults.ts` | `initialCurrentDateCourseState` |
| `dateSpotDefaults.ts` | `initialDateSpotData` |

---

## 認可ロジック

| 操作 | 条件 |
|-----|------|
| デートスポット作成・編集 | `currentUser.admin === true` |
| ユーザープロフィール編集 | `Number(userId) === currentUser.id` |
| コース作成 | `loginStatus === true` |
| 条件不満時の挙動 | `<Navigate to="/" />` + エラーフラッシュメッセージ |

## 開発コマンド

```bash
yarn start   # 開発サーバー起動（craco start）
yarn build   # 本番ビルド（craco build）
yarn test    # テスト実行（craco test）
```

## Docker

`compose.yml` / `Dockerfile.develop` で開発環境をコンテナ化。`docker-entrypoint.sh` でコンテナ起動時の処理を定義。

## 開発ワークフロー

| 作業の種類 | 作成するもの |
|----------|------------|
| 実装・修正が完了したとき | **PR を作成する** |
| 設計・調査・計画のとき | **Issue を作成する** |

- 作業が終わったら必ず PR または Issue を作成して作業を記録する。
- ブランチ命名規則: `fix/<内容>` / `feature/<内容>` / `docs/<内容>` / `refactor/<内容>`
- PR は `main` ブランチへのマージを基本とする。

## API 通信ルール

認証が必要なエンドポイントには必ず `axiosInstance`（`src/lib/axiosInstance.ts`）を使用する。
`client` / `formDataClient`（`src/lib/api/client.ts`）は認証ヘッダーを付与しないため、
`authenticate_user!` が設定されている Rails エンドポイントへの呼び出しには使用しない。

| クライアント | 用途 |
|-----------|------|
| `axiosInstance` | 認証が必要なエンドポイント（Bearer トークン自動付与） |
| `client` | 認証不要なエンドポイント（GET /top, GET /date_spots など） |
| `formDataClient` | 使用しない（axiosInstance に `content-type: multipart/form-data` ヘッダーを渡す） |
