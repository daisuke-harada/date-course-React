// フィーチャーフラグ
//
// REVIEWS_ENABLED:
//   レビュー・評価（星）UI の表示可否。
//   HotPepper 由来の実在・実名店に、自作のユーザーレビュー（=第三者評価）を
//   公開すると信用毀損・風評のリスクがあるため、本番では非表示にする。
//   ローカル/デモでレビュー機能を見せたい時だけ
//   `.env` に REACT_APP_ENABLE_REVIEWS=true を設定して有効化する。
//   （環境変数が未設定 or 'true' 以外なら false = 非表示）
export const REVIEWS_ENABLED = process.env.REACT_APP_ENABLE_REVIEWS === 'true';
