import { useDispatch } from 'react-redux';
import { setCurrentUser, setToken } from 'reducers/loginSlice';
import { SignInParams, User } from 'types/users/session';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from 'lib/axiosInstance';

export const useLoginAuthAction = (signInParams: SignInParams) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState<String[]>([]);

  const afterLoginSuccess = (user: User, token: string) => {
    dispatch(setCurrentUser(user));
    dispatch(setToken(token));
    user.admin === false?
    navigate(`/users/${user.id}`, {state: {message: 'ログインに成功しました', type: 'success-message', condition: true}})
    :
    navigate('/', {state: {message: 'ログインに成功しました', type: 'success-message', condition: true}});
  }

  const loginAction: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // Go バックエンドは name / password をトップレベルで受け取る（Rails の
    // sign_in_params ネストは廃止された）。ネストして送ると 422 でログインできない。
    axiosInstance.post('login', signInParams)
      .then(response => {
        afterLoginSuccess(response.data.user, response.data.token);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          setErrorMessages(error.response.data.errorMessages);
        } else {
          setErrorMessages(['予期しないエラーが発生しました']);
        }
        navigate('', { state: { message: 'ログインに失敗しました', type: 'error-message' } });
      }
    );
  };

  return { loginAction, errorMessages}
};
