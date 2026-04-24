import { useNavigate } from 'react-router-dom';
import { client } from 'lib/api/client';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth } from 'reducers/loginSlice';
import { RootState } from 'reducers';
import { User } from 'types/users/session';

export const useDeactivateAccountButtonAction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector<RootState, User>(state => state.session.currentUser);
  const token = useSelector<RootState, string>(state => state.session.token);

  const onCLickDeactivateAccountAction: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if( currentUser.id === 1 ){
      navigate(`./`, {state: {message: 'guestユーザーは退会できません', type: 'error-message', condition: true}})
    }else {
      if(window.confirm('本当に退会しますか？')){
        client.delete(`users/${currentUser.id}`).then(response => {
          dispatch(clearAuth());
        }).then(() => {
          navigate('/', {state: {message: '退会しました', type: 'success-message', condition: true}});
        });
      };
    }
  };

  return { onCLickDeactivateAccountAction, token };
};
