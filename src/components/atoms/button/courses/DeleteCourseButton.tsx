import { FC, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DateSpotData } from 'types/dateSpots/response';
import { DangerButton } from '../DangerButton';
import { ManagementCourseData } from 'types/managementCourses/management';
import { RootState } from 'reducers';
import { setManagementCourse } from 'reducers/currentDateCourseSlice';
import tw from 'tailwind-styled-components';

type Props = {
  dateSpot: DateSpotData
}

const ButtonParentDiv = tw.div`my-5 m-auto text-sm`;

// デートコースの中から指定されたデートスポットを削除する。
export const DeleteCourseButton: FC<Props> = memo((props) => {
  const { dateSpot } = props;
  const dispatch = useDispatch();
  const managementCourse = useSelector<RootState, ManagementCourseData>(state => state.currentDateCourse.managementCourse);

  const onClickDeleteCourseAction = useCallback(() => {
    const copyCourseDuringSpots = managementCourse.dateSpots.slice();

    copyCourseDuringSpots.splice(
      managementCourse.dateSpots.indexOf(dateSpot),
      1
    );

    dispatch(setManagementCourse({userId: managementCourse.userId, dateSpots: copyCourseDuringSpots}));
  }, [dateSpot, managementCourse, dispatch]);

  return(
    <ButtonParentDiv>
       <DangerButton dataE2e={`courseDeleteButtonId-${dateSpot.id}`} onClickEvent={onClickDeleteCourseAction}>コースを削除</DangerButton>
    </ButtonParentDiv>
  );
});
