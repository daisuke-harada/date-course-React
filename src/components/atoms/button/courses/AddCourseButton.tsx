import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BaseButton } from '../BaseButton';
import { DateSpotData } from 'types/dateSpots/response';
import { ManagementCourseData } from 'types/managementCourses/management';
import { RootState } from 'reducers';
import { User } from 'types/users/session';
import { selectIsLoggedIn } from 'reducers/selectors/authSelectors';
import { setManagementCourse } from 'reducers/currentDateCourseSlice';
import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';

type Props = {
  dateSpot: DateSpotData
}

const ButtonParentDiv = tw.div`m-5 tex-sm`;

export const AddCourseButton: FC<Props> = memo((props) => {
  const { dateSpot } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector<RootState, User>(state => state.session.currentUser);
  const loginStatus = useSelector(selectIsLoggedIn);
  const managementCourse = useSelector<RootState, ManagementCourseData>(state => state.currentDateCourse.managementCourse)
  const onClickAddCourseAction = () => {
    // 以下の2つの条件を満たしている場合のみデートコースにデートスポットを追加することができる
    // ・DuringSpotsの中にdateSpotのdateSpot.idが入っていない場合。
    if(managementCourse.userId === 0){
      dispatch(setManagementCourse({userId: currentUser.id, dateSpots: [dateSpot]}))
      navigate('/managementCourse/createCourse');
    } else if(managementCourse.dateSpots.some(spot => spot.id === dateSpot.id)){
      navigate('./', {state: {message: 'このスポットはすでに選択されています', type: 'error-message', condition: true}});
    } else {
      const dateCourseIdAndNames = managementCourse.dateSpots.slice();
      dateCourseIdAndNames.push(dateSpot);
      dispatch(setManagementCourse({userId: currentUser.id, dateSpots: dateCourseIdAndNames}));
      navigate('/managementCourse/createCourse');
    };
  };

  return(
    <>
      {
        loginStatus
        && currentUser.admin === false
        &&
        (
        <ButtonParentDiv>
          <BaseButton dataE2e={`courseAddButtonId-${dateSpot.id}`} onClickEvent={onClickAddCourseAction}>デートコースに追加</BaseButton>
        </ButtonParentDiv>
        )
      }
    </>
  );
});
