// バックエンドが返す画像 URL を、実際に表示できる URL に解決する。
//
// Go バックエンドが返す image.url は 2 種類ある。
//
//   1. HotPepper 由来のスポット … `https://imgfp.hotp.jp/...` の絶対 URL
//   2. seed 由来の手動データ    … `public/images/date_spot_images/カフェ.jpg` の相対パス
//      （ユーザーのプロフィール画像も同じく `public/images/user_images/man1.jpg`）
//
// 2 は Rails 時代の名残で、当時は CarrierWave の asset_host が
// `http://localhost:7777` を前置して絶対 URL にしていた。Go は静的配信を持たず
// パスをそのまま返すため、<img> に渡すとフロント自身のオリジンを見に行って壊れる。
//
// そこで同名のファイルをフロントの public/images/ に置き、ここでパスを差し替える。
// バックエンドが画像配信を持つようになったら、この分岐ごと不要になる。
const LEGACY_PREFIX = 'public/images/';

export const displayableImageUrl = (url?: string | null): string | null => {
  if (!url) return null;
  if (/^https?:\/\//.test(url)) return url;
  if (url.startsWith(LEGACY_PREFIX)) {
    return `${process.env.PUBLIC_URL}/images/${url.slice(LEGACY_PREFIX.length)}`;
  }
  // 想定外の形式は表示できないものとして扱い、呼び出し側の no_image に任せる。
  return null;
};
