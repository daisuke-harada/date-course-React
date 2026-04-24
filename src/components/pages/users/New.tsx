import { FC, memo, useCallback } from 'react';
import { setCurrentUser, setLoginStatus } from 'reducers/loginSlice';

import { User } from 'types/users/session';
import { UserForm } from 'components/templates/users/UserForm';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const New: FC = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const afterLoginSuccess = useCallback((data: User) => {
    dispatch(setLoginStatus(true))
    dispatch(setCurrentUser(data))
    navigate(`/users/${data.id}`, {state: {message: '新規登録に成功しました', type: 'success-message', condition: true}});
  },[navigate, dispatch]);

  return(
    <UserForm
      nameDefaultValue={''}
      emailDefaultValue={''}
      genderDefaultValue={'男性'}
      userFormTitle={'ユーザー新規登録'}
      buttonName={'登録'}
      afterLoginSuccess={afterLoginSuccess}
    />
  );
});
