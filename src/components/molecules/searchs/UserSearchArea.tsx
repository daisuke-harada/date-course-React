import { FC, memo, useState } from 'react';

import { BaseButton } from 'components/atoms/button/BaseButton';
import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';

const Input = tw.input`py-1 px-3 w-full border-2 border-red-100 rounded-xl`;

type Props = {
  userSearchName?: string
}


export const UserSearchArea: FC<Props> = memo((props) => {
  const { userSearchName } = props;
  const [ userName, setUserName ] = useState(userSearchName || '');
  const navigate = useNavigate();
  const onChangeSearchName: React.ChangeEventHandler<HTMLInputElement> = (e) => setUserName(e.target.value);

  const onClickSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate(`/users/index?name=${encodeURIComponent(userName)}`);
  };

  return(
    <>
      <div className='pt-5 mt-5 mb-2 px-2'>
        <Input onChange={onChangeSearchName} type='text' value={userName} placeholder='名前を検索' />
      </div>
      <div className='m-auto my-5 w-1/4'>
        <BaseButton onClickEvent={onClickSearch}>検索</BaseButton>
      </div>
    </>
  );
});