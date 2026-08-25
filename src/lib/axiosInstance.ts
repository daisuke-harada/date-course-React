import applyCaseMiddleware from 'axios-case-converter';
import axios, { AxiosInstance } from 'axios';
import store from 'reducers/index';
import { clearAuth } from 'reducers/loginSlice';

const options = {
  ignoreHeaders: true,
};

// ログイン中ならトークンを付与する。
// 認証が不要なエンドポイントでも、非公開のデートコースを作成者に返すために
// サーバー側が「誰が見ているか」を必要とするため、GET でも一律で付ける。
const attachToken = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => {
    const token = store.getState().session.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

// トークンを付けて送ったのに 401 ＝ セッション切れとみなしてログアウトさせる。
// トークンを付けていないリクエストの 401（ログイン失敗など）は呼び出し側で
// ハンドリングさせる。ここで強制遷移するとログイン失敗のメッセージを出せない。
const logoutOnExpiredSession = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 && error.config?.headers?.Authorization) {
        store.dispatch(clearAuth());
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};

// applyCaseMiddleware:
// axiosで受け取ったレスポンスの値をスネークケース→キャメルケースに変換
// または送信するリクエストの値をキャメルケース→スネークケースに変換してくれるライブラリ
const axiosInstance = applyCaseMiddleware(axios.create({
  baseURL: process.env.REACT_APP_BACKEND_DOMAIN_API,
}), options);

// 画像アップロードなど multipart/form-data で送る場合に使う。
export const formDataInstance = applyCaseMiddleware(axios.create({
  baseURL: process.env.REACT_APP_BACKEND_DOMAIN_API,
  headers: {
    'content-type': 'multipart/form-data',
  },
}));

attachToken(axiosInstance);
logoutOnExpiredSession(axiosInstance);
attachToken(formDataInstance);
logoutOnExpiredSession(formDataInstance);

export default axiosInstance;
