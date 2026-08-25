import { useSelector } from "react-redux";

import { RootState } from "reducers";
import { User } from "types/users/session";
import { selectIsLoggedIn } from "reducers/selectors/authSelectors";


export const HeaderBottomRoutes =  () => {
  const currentUser = useSelector<RootState, User>(state => state.session.currentUser)
  // currentUser は未ログインでも初期値のオブジェクトが入っていて常に truthy なので、
  // ログイン判定はトークンを見る selectIsLoggedIn を使う。
  // ここを currentUser にしていたため、未ログインでもマイページが出ていた。
  const loginStatus = useSelector(selectIsLoggedIn)

  const headers = [
    {
      text: 'Topページ',
      dataE2e: 'top-link',
      path: '/'
    },
    {
      text: 'デートスポットを探す',
      dataE2e: 'dateSpot-index',
      path: 'dateSpots/index'
    },
    {
      text: 'デートコースを探す',
      dataE2e: 'dateCourse-index',
      path: 'courses/index'
    },
    {
      text: 'ユーザーを探す',
      dataE2e: 'user-index',
      path: 'users/index'
    },
  ];

  // 管理者もデートコースを持てるようになったため、マイページは全ログインユーザーに出す
  loginStatus && headers.push({ text: 'マイページ', dataE2e: 'myPage-data', path: `users/${currentUser.id}` });

  return headers;
}