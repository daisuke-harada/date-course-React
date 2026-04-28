import { AreaData, GenreData, PrefectureData } from 'types/homes/data';
import { FC, memo, useEffect, useState } from 'react';

import { Area } from 'components/organisms/card/homes/Area';
import { DateSpotData } from 'types/dateSpots/response';
import { DateSpotRanking } from 'components/organisms/rankings/DateSpotRanking';
import { Genres } from 'components/organisms/card/homes/Genres';
import { Loading } from 'components/pages/Loading';
import { MainGenre } from 'components/organisms/card/homes/MainGenre';
import { MainPrefecture } from 'components/organisms/card/homes/MainPrefecture';
import { client } from 'lib/api/client';
import { defaultDateSpot } from 'datas/defaultDateSpotData';
import tw from 'tailwind-styled-components';

const ImageParentDiv = tw.div`relative h-96`;
const Image = tw.img`object-cover object-top absolute w-full h-full`;
const SubAreaDiv = tw.div`flex justify-center flex-wrap w-full`;

export const Top: FC = memo(() => {
  const [ areas, setAreas ] = useState<AreaData[]>([]);
  const [ mainGenres, setMainGenres ] = useState<GenreData[]>([]);
  const [ genres, setGenres ] = useState<GenreData[]>([]);
  const [ mainPrefectures, setMainPrefectures ] = useState<PrefectureData[]>([]);
  const [dateSpots, setDateSpots] = useState<DateSpotData[]>([defaultDateSpot]);


  useEffect(() => {
    client.get('top').then((response) => {
      setAreas(response.data.areas);
      setGenres(response.data.genres);
      setMainGenres(response.data.mainGenres);
      setMainPrefectures(response.data.mainPrefectures);
      console.log(response.data.mainPrefectures);
      setDateSpots(response.data.dateSpots);
    });
  }, []);

  return(
    <Loading loadingSwitch={dateSpots.length !== 0 && dateSpots[0].id === 0 && true}>
      <ImageParentDiv>
        <Image src={`${process.env.PUBLIC_URL}/lp.jpg`} />
        {/* <h1 className='m-5 dtext-3xl font-bold z-10 bottom-0 absolute'>
          <BaseButton>デートコースを作成する</BaseButton>
        </h1>  */}
      </ImageParentDiv>
      <div className='mb-1'>
        <p className='md:text-3xl font-bold text-xl pt-10 text-center'>デートスポットをエリアから探す</p>
        <SubAreaDiv>
          {
            mainPrefectures.map((mainPrefecture) => (
              <MainPrefecture key={mainPrefecture.id} prefecture={mainPrefecture} />
            ))
          }
          {
            areas.map((area) => (
              <Area key={area.id} area={area} />
            ))
          }
        </SubAreaDiv>
      </div>
      <div className='mb-1'>
        <p className='md:text-3xl font-bold text-xl pt-10 text-center'>デートスポットをジャンルで探す</p>
        <div className='flex'>
          <SubAreaDiv>
            {
              mainGenres.map((genre) => (
                <MainGenre key={genre.id} genre={genre} />
              ))
            }
            <Genres genres={genres} />
          </SubAreaDiv>
        </div>
      </div>

      <div className='w-10/12 m-auto'>
        <DateSpotRanking dateSpots={dateSpots} />
      </div>
    </Loading>
  );
});