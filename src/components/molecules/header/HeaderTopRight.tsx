import { FC, memo } from 'react';

import { GuestLoginButton } from 'components/atoms/button/users/GuestLoginButton';
import { LogOutButton } from 'components/atoms/button/users/LogOutButton';
import { MenuIconButton } from 'components/atoms/button/MenuIconButton';
import { RootState } from 'reducers';
import { selectIsLoggedIn } from 'reducers/selectors/authSelectors';
import tw from 'tailwind-styled-components';
import { useSelector } from 'react-redux';

type Props = {
  isOpen: boolean,
  onClickNavBarSwitch: React.MouseEventHandler<HTMLElement>,
}

const MenuIconDivParent = tw.div`lg:hidden`;
const MenuIconDivChild = tw.div`sm:h-24 sm:right-7 right-2 fixed  border-l-2 w-14 h-20 border-red-400`;
const ButtonParentDiv = tw.div`lg:block hidden mt-5`;

export const HeaderTopRight: FC<Props> = memo((props) => {
  const {onClickNavBarSwitch, isOpen} = props;
  const loginStatus = useSelector(selectIsLoggedIn)

  return(
    <>
      <MenuIconDivParent>
        <MenuIconDivChild>
          <MenuIconButton onClickNavBarSwitch={onClickNavBarSwitch} isOpen={isOpen} />
        </MenuIconDivChild>
      </MenuIconDivParent>
      <ButtonParentDiv>
        { loginStatus ?
         <LogOutButton />:
         <GuestLoginButton />
        }
      </ButtonParentDiv>
    </>
  );
});