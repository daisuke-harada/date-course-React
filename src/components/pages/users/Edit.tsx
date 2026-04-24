import { FC, memo } from 'react';

import { RootState } from 'reducers';
import { User } from 'types/users/session';
import { UserForm } from 'components/templates/users/UserForm';
import { useSelector } from 'react-redux';

export const Edit: FC = memo(() => {
  const currentUser = useSelector<RootState, User>(state => state.session.currentUser)
  return(
   <UserForm
    nameDefaultValue={currentUser.name}
    emailDefaultValue={currentUser.email}
    genderDefaultValue={currentUser.gender}
    imageDefaultValue={currentUser.image?.url}
    userFormTitle={'アカウント情報編集'}
    buttonName={'更新'}
  />
  );
});