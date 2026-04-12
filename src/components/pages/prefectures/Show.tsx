import { memo, useEffect, useState, FC } from 'react';
import { useParams } from 'react-router-dom';
import { DateSpotData } from 'types/dateSpots/response';

import { DateSpotNameSearchBar } from 'components/organisms/searchs/DateSpotNameSearchBar';
import { DateSpotSortSearchBar } from 'components/organisms/searchs/DateSpotSortSearchBar';
import { MultiBar } from 'components/organisms/searchs/MultiBar';
import { DateSpots } from 'components/templates/dateSpots/DateSpots';
import { IndexLayout } from 'components/templates/layouts/IndexLayouts';
import { defaultDateSpot } from 'datas/defaultDateSpotData';
import { client } from 'lib/api/client';

export const Show: FC = memo(() => {
  const [dateSpots, setDateSpots] = useState<DateSpotData[]>([defaultDateSpot]);
  const { id } = useParams();

  useEffect(() => {
    client.get(`prefectures/${id}`).then(response => {
      console.log(response)
      console.log(response.data)
      setDateSpots(response.data);
    })
  }, [id]);

  return(
    <IndexLayout
      sideArea={
        <>
          <DateSpotSortSearchBar
            defaultPrefectureId={`${id}`}
            defaultGenreId=''
            defaultComeTime=''
          />
          <DateSpotNameSearchBar />
        </>
      }

      topArea={
        <MultiBar
          defaultDateSpotCondition='bg-red-400'
          defaultCourseCondition='bg-gray-300'
          defaultUserCondition='bg-gray-300'
          defaultSearchSwitch='DateSpot'
          defaultPrefectureId={`${id}`}
        />
      }

      mainArea={<DateSpots dateSpots={dateSpots} prefectureId={`${id}`} />}
    />
  );
});