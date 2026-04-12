import { FC, memo } from 'react';

import { DateSpotData } from 'types/dateSpots/response';
import { DateSpotForm } from 'components/templates/dateSpots/DateSpotForm';
import { useLocation } from 'react-router-dom';

export const Edit: FC = memo(() => {
  const location = useLocation();
  const state = location.state as {dateSpot: DateSpotData};
  const dateSpot = state.dateSpot;

  return(
    <DateSpotForm
      dateSpotFormTitle='デートスポット情報の編集'
      formButtonName='更新'
      nameDefaultValue={dateSpot.name}
      prefectureDefaultValue={dateSpot.prefectureName}
      cityNameDefaultValue={dateSpot.cityName}
      genreDefaultValue={dateSpot.genreId.toString()}
      openingTimeDefaultValue={
        (dateSpot.openingTime
        && dateSpot.openingTime.toString())
        || ''
      }
      closingTimeDefaultValue={
        (dateSpot.closingTime
        && dateSpot.closingTime.toString())
        || ''
      }
      dateSpotId={dateSpot.id}
   />
  );
});