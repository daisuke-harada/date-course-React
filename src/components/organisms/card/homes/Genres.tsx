import { FC, memo } from 'react';

import { GenreData } from 'types/homes/data';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

const MainDiv = tw.div`m-4 p-4 w-9/12 flex flex-wrap lg:justify-start justify-center`;

type Props ={
  genres: GenreData[]
}

export const Genres: FC<Props> = memo((props) => {

  const { genres } = props;

  return(
    <MainDiv>
      {
        genres.map((genre) => (
          <div key={genre.id} className='font-bold w-36 m-2'>
            <Link to={`/genres/${genre.id}`}>
              {genre.name}
            </Link>
          </div>
        ))
      }
    </MainDiv>
  );
});