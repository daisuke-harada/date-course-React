import { FC, memo, useEffect } from 'react';

import { CourseCard } from 'components/organisms/card/courses/CourseCard';
import { CourseResponseData } from 'types/courses/response';
import { Loading } from 'components/pages/Loading';
import { prefectureDatas } from 'datas/prefectureDatas';
import { useNavigate } from 'react-router-dom';

type Props = {
  courses: CourseResponseData[],
  searchPrefectureId?: number
};

export const Courses: FC<Props> = memo((props) => {
  const { courses, searchPrefectureId } = props;
  const navigate = useNavigate();

  useEffect(() => {
    searchPrefectureId === 0
    &&
    navigate('/courses/index');
  });

  return(
    // courses が配列であることを確認してからアクセスします。
    // API の返却がオブジェクトになっているなど想定外の型でもクラッシュしないようにする。
    <Loading loadingSwitch={Array.isArray(courses) && courses.length !== 0 && courses[0]?.id === 0}>
      {
        Array.isArray(courses) && courses.length !== 0 ? (
          <>
            {
              typeof searchPrefectureId !== 'undefined' && searchPrefectureId !== 0 && (
                <div className='text-xl px-2 mb-10 font-bold text-center'>
                  {`${prefectureDatas.find((prefecture) => prefecture.id === searchPrefectureId)?.name}を含むデートコース`}
                </div>
              )
            }
            <div className='sm:justify-start justify-center flex flex-wrap px-2'>
              {courses.map((course, index) => (<CourseCard key={index} course={course} />))}
            </div>
          </>
        ) : (
          <div className='mt-2 text-center text-red-400 text-4xl'>
            デートコースは存在しません
          </div>
        )
      }
    </Loading>
  );
});