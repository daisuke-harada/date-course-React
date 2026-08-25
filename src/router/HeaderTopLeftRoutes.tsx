import { useSelector } from 'react-redux';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { SecondaryButton } from 'components/atoms/button/SecondaryButton';
import { User } from 'types/users/session';
import { RootState } from 'reducers';

export const HeaderTopLeftRoutes = () => {
  const currentUser = useSelector<RootState, User>(state => state.session.currentUser)
  const token = useSelector<RootState, string>(state => state.session.token)

  const createCourseRoute = {
    element: <BaseButton dataE2e='header-dateCourse-new-link' >デートコース作成</BaseButton>,
    path: 'managementCourse/createCourse',
  };

  const userRoutes = [createCourseRoute];

  // 管理者もデートコースを作成できる
  const adminRoutes = [
    {
      element: <BaseButton dataE2e='header-dateSpot-new-link' >デートスポット作成</BaseButton>,
      path: 'dateSpots/new',
    },
    createCourseRoute,
  ];

  // 未ログインでもデートコースの組み立てはできる。登録の時点でログインを求める。
  const noLoginRoutes = [
    createCourseRoute,
    {
      element: <BaseButton dataE2e='header-signup-link' >新規登録</BaseButton>,
      path: 'users/new'
    },
    {
      element: <SecondaryButton dataE2e='header-login-link'>ログイン</SecondaryButton>,
      path: 'login'
    },
  ];

  if(token && currentUser.admin === true) {
    return adminRoutes;
  }else if(token) {
    return userRoutes;
  }else {
    return noLoginRoutes;
  };
};
