import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearAuth } from 'reducers/loginSlice';

export const useLogoutAction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickLogOut = useCallback(() => {
    dispatch(clearAuth());
    navigate('/', {state: {message: 'ログアウトしました', type: 'success-message', condition: true}});
  }, [clearAuth, navigate]);

  return { onClickLogOut };
};
