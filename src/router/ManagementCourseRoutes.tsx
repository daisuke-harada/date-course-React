import { CreateCourse } from 'components/pages/managementCourses/CreateCourse';
import { Page404 } from 'components/pages/Page404';
import { PrivateRoute } from 'router/PrivateRoute';

export const ManagementCourseRoutes = () => {
  return [
    {
      path: 'createCourse',
      element: <PrivateRoute element={<CreateCourse />} />,
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ];
};
