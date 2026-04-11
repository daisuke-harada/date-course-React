import { FC, memo } from 'react';

import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';
import { DateSpotForm } from 'components/templates/dateSpots/DateSpotForm';
import { useLocation } from 'react-router-dom';

export const Edit: FC = memo(() => {
  const location = useLocation();
  const state = location.state as {addressAndDateSpot: AddressAndDateSpotJoinData};
  const addressAndDateSpot = state.addressAndDateSpot;

  return(
    <DateSpotForm
      dateSpotFormTitle='デートスポット情報の編集'
      formButtonName='更新'
      nameDefaultValue={addressAndDateSpot.name}
      prefectureDefaultValue={addressAndDateSpot.prefectureName}
      cityNameDefaultValue={addressAndDateSpot.cityName}
      genreDefaultValue={addressAndDateSpot.genreId.toString()}
      openingTimeDefaultValue={
        (addressAndDateSpot.openingTime
        && addressAndDateSpot.openingTime.toString())
        || ''
      }
      closingTimeDefaultValue={
        (addressAndDateSpot.closingTime
        && addressAndDateSpot.closingTime.toString())
        || ''
      }
      dateSpotId={addressAndDateSpot.id}
   />
  );
});