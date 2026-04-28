import { FC, memo, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { UserResponseData } from 'types/users/response';
import { Users } from 'components/templates/users/Users';
import { defaultUserResponseData } from 'datas/defaultUserData';
import axiosInstance from 'lib/axiosInstance';

export const Followers: FC = memo(() => {
  const { id } = useParams();
  const [users, setUsers] = useState<UserResponseData[]>([defaultUserResponseData]);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    axiosInstance.get(`users/${id}/followers`).then(response => {
      setUsers(response.data.users);
      setUserName(response.data.userName);
    });
  }, [id]);

  return(
    <>
      <h1 className='m-10 lg:text-2xl mobile(L):text-xl mobile(M):text-lg text-xs'>
        <span className='font-bold mr-1'>
          <Link to={`/users/${id}`}>
            {userName}
          </Link>
        </span>
        のフォロワー
      </h1>
      <Users users={users} />
    </>
  );

});