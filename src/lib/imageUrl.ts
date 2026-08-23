// バックエンドが返す画像 URL を、実際に表示できる URL に解決する。
//
// Go バックエンドが返す image.url は 2 種類ある。
//
//   1. HotPepper 由来のスポット … `https://imgfp.hotp.jp/...` の絶対 URL
//   2. seed 由来のデータ        … `/images/user_images/man1.jpg` のような、
//      このアプリの public/ に置いた静的ファイルを指すルート基準の絶対パス
//
// どちらもそのまま <img src> に渡せるため、ここでは «表示できない値» を弾くのが役割。
//
// なお 2 は以前 `public/images/...` という相対パスだった（Rails 時代の名残で、
// 当時は CarrierWave の asset_host が絶対 URL を組み立てていた）。Go は画像を
// 配信しないためこの形式では表示できず、seed 側をルート基準の絶対パスに直した。
// DB を作り直していない環境では旧形式が残るので、後方互換として変換しておく。
const LEGACY_PREFIX = 'public/images/';

export const displayableImageUrl = (url?: string | null): string | null => {
  if (!url) return null;
  if (/^https?:\/\//.test(url)) return url;
  if (url.startsWith('/')) return url;
  if (url.startsWith(LEGACY_PREFIX)) {
    return `${process.env.PUBLIC_URL}/images/${url.slice(LEGACY_PREFIX.length)}`;
  }
  // 想定外の形式は表示できないものとして扱い、呼び出し側の no_image に任せる。
  return null;
};
