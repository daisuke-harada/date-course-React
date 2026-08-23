import { CreateCourse } from 'components/pages/managementCourses/CreateCourse';
import { Page404 } from 'components/pages/Page404';

export const ManagementCourseRoutes = () => {
  return [
    {
      // デートコースの組み立ては未ログインでもできる。
      // 登録（API への POST）だけがログインを必要とする。
      path: 'createCourse',
      element: <CreateCourse />,
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ];
};
