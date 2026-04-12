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
    client.get(`genres/${id}`).then(response => {
      setDateSpots(response.data.dateSpots);
    })
  }, [id]);

  return(
    <IndexLayout
      sideArea={
        <>
          <DateSpotSortSearchBar
            defaultPrefectureId=''
            defaultGenreId={`${id}`}
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
          defaultGenreId={`${id}`}
        />
      }

      mainArea={
        <DateSpots
          dateSpots={dateSpots}
          genreId={`${id}`}
        />
      }
    />
  );
});