import { FC, memo, useEffect, useState } from 'react';

import { AddCourseButton } from 'components/atoms/button/courses/AddCourseButton';
import { BaseButton } from 'components/atoms/button/BaseButton'
import { BusinessHour } from 'components/atoms/text/dateSpots/BusinessHour';
import { DateSpotData } from 'types/dateSpots/response';
import { DateSpotReviewArea } from 'components/organisms/area/dateSpotReviews/DateSpotReviewArea';
import { GoogleMap } from 'components/molecules/maps/GoogleMap';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading';
import { RootState } from 'reducers';
import { StarRateText } from 'components/atoms/text/StarRateText';
import { User } from 'types/users/session';
import { client } from 'lib/api/client';
import { defaultDateSpot } from 'datas/defaultDateSpotData';
import { selectIsLoggedIn } from 'reducers/selectors/authSelectors';
import tw from 'tailwind-styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MainDiv = tw.div`border shadow-xl bg-white mt-10 p-3 rounded-2xl m-2`;
const DateSpotNameTitle = tw.h1`w-full my-5 text-sm font-bold md:text-3xl`;
const SubDiv = tw.div`md:flex-row flex-col w-full flex`;
const ImageParentDiv = tw.div`lg:mx-0 mx-auto lg:h-96 lg:w-96 mobile(M):h-80 mobile(M):w-80 h-64 w-64 relative`;
const Image = tw.img`object-cover absolute top-0 w-full h-full rounded-2xl`;
const SubArea = tw.div`md:w-1/2 w-full`;

export const Show: FC = memo(() => {
  const { id } = useParams();
  const [dateSpot, setDateSpot] = useState<DateSpotData>(defaultDateSpot);
  const [dateSpotReviews, setDateSpotReviews] = useState([]);
  const noImageUrl = `${process.env.PUBLIC_URL}/no_image.jpg`;
  const [dateSpotImage, setDateSpotImage] = useState(noImageUrl);
  const [dateSpotAverageRate, setDateSpotAverageRate] = useState(0);

  const currentUser = useSelector<RootState, User | undefined>(state => state.session.currentUser)
  const loginStatus = useSelector(selectIsLoggedIn)

  useEffect(() => {
    client.get(`date_spots/${id}`).then(response => {
      const spot = response.data.dateSpot;
      setDateSpot(spot);
      spot?.image?.url !== null && spot?.image?.url && setDateSpotImage(spot.image.url);
      setDateSpotReviews(response.data.dateSpotReviews);
      setDateSpotAverageRate(response.data.reviewAverageRate);
    });
  }, [id]);

  return(
    <Loading loadingSwitch={dateSpot.id === 0 && true}>
      <MainDiv>
        <SubDiv>
          <SubArea>
            <ImageParentDiv>
              <Image src={dateSpotImage} alt='DateSpotProfileImage' />
            </ImageParentDiv>
            <DateSpotNameTitle>{dateSpot?.name}</DateSpotNameTitle>
            <div className='flex flex-col'>
              <div className='ml-1 font-bold'>評価{dateSpotAverageRate}</div>
              <StarRateText rate={dateSpotAverageRate} size={50} />
            </div>
            <BusinessHour openingTime={dateSpot?.openingTime} closingTime={dateSpot?.closingTime} />
            <div className='mx-2 my-5 text-sm font-bold md:text-xl'>
              {dateSpot?.cityName}
            </div>
            <div className='mx-2 my-5 text-sm font-bold md:text-xl'>
              <Link to={`/genres/${dateSpot?.genreId}`}>
                {dateSpot?.genreName}
              </Link>
            </div>
            <div className='lg:text-base md:mx-0 mobile(L):w-1/2 m-auto text-xs text-center mb-5'>
              <AddCourseButton dateSpot={dateSpot}/>
            </div>
            <div className='w-1/3 text-center mb-5'>
              {
                loginStatus
                && currentUser?.admin === true
                && (
                  <Link
                      className='text-white'
                      to={`edit`}
                      state={{dateSpot: dateSpot}}
                  >
                    <BaseButton dataE2e='dateSpot-edit-button'>
                        設定
                    </BaseButton>
                  </Link>
                )
              }
            </div>
          </SubArea>
          <SubArea>
            {
              dateSpot
              &&
              <GoogleMap dateSpot={dateSpot} />
            }
          </SubArea>
        </SubDiv>
      </MainDiv>

      <MainDiv>
        {
          dateSpot
          &&
          <DateSpotReviewArea
            dateSpotId={dateSpot.id}
            dateSpotReviews={dateSpotReviews}
            setDateSpotReviews={setDateSpotReviews}
            setDateSpotAverageRate={setDateSpotAverageRate}
          />
        }
      </MainDiv>
    </Loading>
  );
});
