import { FC, memo } from 'react';

import { DateSpotData } from 'types/dateSpots/response';
import { DateSpotCard } from 'components/organisms/card/dateSpots/DateSpotCard';
import { DateSpotRanking } from 'components/organisms/rankings/DateSpotRanking';
import { Loading } from 'components/pages/Loading';

type Props = {
  dateSpots: DateSpotData[],
  prefectureId?: string,
  genreId?: string,
  comeTime?: string,
  dateSpotSearchName?: string,
};

export const DateSpots: FC<Props> = memo((props) => {
  const { dateSpots, prefectureId, genreId, comeTime, dateSpotSearchName } = props;

  return(
    <Loading loadingSwitch={dateSpots.length !== 0 && dateSpots[0].id === 0 && true} >
      {
        dateSpots.length !== 0?
        (
          <>
            <DateSpotRanking
              dateSpots={dateSpots}
              prefectureId={prefectureId}
              genreId={genreId}
              comeTime={comeTime}
              dateSpotSearchName={dateSpotSearchName}
            />
            <div className='sm:justify-start justify-center flex flex-wrap'>
              {dateSpots.map((dateSpot: DateSpotData) => (<DateSpotCard key={dateSpot.id} dateSpot={dateSpot} />))}
            </div>
          </>
        )
        :
        (
          <div className='mt-2 text-center text-red-400 text-4xl'>
            デートスポットは存在しません
          </div>
        )
      }
    </Loading>
  );
});