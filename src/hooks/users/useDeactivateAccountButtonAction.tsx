import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'reducers';
import { User } from 'types/users/session';
import axiosInstance from 'lib/axiosInstance';
import { clearAuth } from 'reducers/loginSlice';
import { selectIsLoggedIn } from 'reducers/selectors/authSelectors';
import { useNavigate } from 'react-router-dom';

export const useDeactivateAccountButtonAction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector<RootState, User>(state => state.session.currentUser);
  const token = useSelector<RootState, string>(state => state.session.token);
  const loginStatus = useSelector(selectIsLoggedIn);

  const onCLickDeactivateAccountAction: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if( currentUser.id === 1 ){
      navigate(`./`, {state: {message: 'guestユーザーは退会できません', type: 'error-message', condition: true}})
    }else {
      if(window.confirm('本当に退会しますか？')){
        axiosInstance.delete(`users/${currentUser.id}`).then(response => {
          dispatch(clearAuth());
        }).then(() => {
          navigate('/', {state: {message: '退会しました', type: 'success-message', condition: true}});
        });
      };
    }
  };

  return { onCLickDeactivateAccountAction, token, loginStatus };
};
