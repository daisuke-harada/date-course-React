import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';

type Props = {
  element: JSX.Element;
};

export const PrivateRoute = ({ element }: Props) => {
  const token = useSelector<RootState, string>(state => state.session.token);

  if (!token) {
    return <Navigate to='/login' replace />;
  }
  return element;
};
