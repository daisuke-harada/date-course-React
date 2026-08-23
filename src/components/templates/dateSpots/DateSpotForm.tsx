import { FC, memo, useCallback, useState } from 'react';
import axiosInstance from 'lib/axiosInstance';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { DangerButton } from 'components/atoms/button/DangerButton';
import { GenreSelect } from 'components/molecules/select/dateSpots/GenreSelect';
import { ImageForm } from 'components/atoms/form/ImageForm';
import { PrefectureSelect } from 'components/molecules/select/dateSpots/PrefectureSelect';
import { prefectureDatas } from 'datas/prefectureDatas';
import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';

const MainDiv = tw.div`xl:w-1/3 lg:w-1/2 mobile(L):mt-10 mobile(M):w-5/6 mobile(M):mx-auto w-full mx-1 mt-10  mobile(L):text-base mobile(M):text-sm text-xs mobile(L):px-5 px-1 pt-2  flex flex-col items-center bg-white shadow-lg border-gray-900 rounded-3xl`;
const Title = tw.h1`sm:text-3xl text-center font-bold text-xl m-5`;
const SubDiv = tw.div`p-5 mt-2 content-center mobile(M):ml-2`;
const Input = tw.input`mb-5 border-b-2 outline-none w-full`;
const ButtonParentDiv = tw.div`text-center p-1 my-4 m-auto w-1/3`;

type Props = {
  dateSpotFormTitle: string,
  formButtonName: string,
  nameDefaultValue: string,
  prefectureDefaultValue: string,
  cityNameDefaultValue: string,
  genreDefaultValue: string,
  imageDefaultValue?: File,
  dateSpotId?: number
};


export const DateSpotForm: FC<Props> = memo((props) => {
  const {
    dateSpotFormTitle,
    formButtonName,
    dateSpotId,
    nameDefaultValue,
    prefectureDefaultValue,
    cityNameDefaultValue,
    genreDefaultValue,
    imageDefaultValue,
  } = props;

  const navigate = useNavigate();

  // エラーメッセージ用のステート
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [name, setName] = useState<string>(nameDefaultValue);
  const [prefectureValue, setPrefectureValue] = useState<string >(prefectureDatas.find((data) => (data.name === prefectureDefaultValue))?.id.toString() || '');
  const [cityName, setCityName] = useState<string>(cityNameDefaultValue);
  const [genreValue, setGenreValue] = useState<string>(genreDefaultValue);
  const [image, setImage] = useState<File | undefined>(imageDefaultValue);

  const onChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => setName(e.target.value);
  const onChangePrefectureValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setPrefectureValue(e.target.value), []);
  const onChangeCityName: React.ChangeEventHandler<HTMLInputElement> = (e) => setCityName(e.target.value);
  const onChangeGenreValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setGenreValue(e.target.value), []);

  const selectImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.currentTarget.files !== null){
      setImage(e.currentTarget.files[0]);
    }else{
      setImage(undefined);
    };
  }, []);

  // Go バックエンドは date_spot ネストを持たず、各値をトップレベルのスネークケースで読む
  // （POST は ctx.FormValue、PUT は form タグへの Bind）。
  // FormData は axios-case-converter の変換対象外なので、サーバーが読むキー名で直接積む。
  //
  // なお image は Go 側が「文字列（URL）」として受け取る作りで、ファイルアップロードは
  // 未実装のため、ファイルを積んでもサーバー側では空として扱われる。
  const createFormData = (): FormData => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('genre_id', genreValue);
    image && formData.append('image', image);
    formData.append('prefecture_id', prefectureValue);
    formData.append('city_name', cityName);
    return formData;
  };

  const apiDateSpotCreateAccess = (dateSpot: FormData) => {
    axiosInstance.post('date_spots', dateSpot, { headers: { 'content-type': 'multipart/form-data' } }).then(response => {
      console.log(response.data)
      navigate(`/dateSpots/${response.data.dateSpotId}`,  {state: {message: '新規登録に成功しました', type: 'success-message', condition: true}});
    })
    .catch(error => {
      setErrorMessages(error.response.data.errorMessages);
    })
  };

  const apiDateSpotUpdateAccess = (dateSpot: FormData, dateSpotId: number) => {
    axiosInstance.put(`date_spots/${dateSpotId}`, dateSpot, { headers: { 'content-type': 'multipart/form-data' } }).then(response => {
      console.log(response)
      navigate(`/dateSpots/${response.data.dateSpotId}`,  {state: {message: '情報を更新しました', type: 'success-message', condition: true}});
    }).catch(error => {
      setErrorMessages(error.response.data.errorMessages);
    });
  };

  // デートスポット登録用、更新用
  const DateSpotRegistAndUpdateAction: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const dateSpot = createFormData();

    // dateSpotの新規登録の挙動
    if (formButtonName === '登録'){
      apiDateSpotCreateAccess(dateSpot);
    } else if(formButtonName === '更新' && dateSpotId){
      apiDateSpotUpdateAccess(dateSpot, dateSpotId);
    };

    e.preventDefault();
  };

  // デートスポット削除用
  const onCLickDeleteDateSpotAction: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if(window.confirm('本当に削除しますか？')){
      axiosInstance.delete(`date_spots/${dateSpotId}`).then(response => {
        response.status === 204 && navigate('/', {state: {message: '削除しました', type: 'success-message', condition: true}} );
      });
    };
  };

  return(
    <MainDiv>
      <Title>{dateSpotFormTitle}</Title>
      {/* エラーメッセージ  */}
      <ul className='mt-5'>
        {errorMessages.map((message) => <li key={message} className='text-red-500'>{message}</li>)}
      </ul>

      <SubDiv>
        <Input data-e2e='dateSpot-form-name-input' placeholder='名前を入力' value={name} onChange={onChangeName} />
        <PrefectureSelect dataE2e='dateSpot-prefecture-select' value={prefectureValue} onChangeValue={onChangePrefectureValue} />
        <Input data-e2e='dateSpot-form-cityName-input' placeholder='市町村名、番地' value={cityName} onChange={onChangeCityName} />
        <GenreSelect dataE2e='dateSpot-genre-select' value={genreValue} onChangeValue={onChangeGenreValue} />
        <ImageForm selectImage={selectImage} />
        <ButtonParentDiv>
          <BaseButton dataE2e='dateSpot-form-button' onClickEvent={DateSpotRegistAndUpdateAction}>{formButtonName}</BaseButton>
        </ButtonParentDiv>
        {
          dateSpotId
          &&
          (
            <ButtonParentDiv>
              <DangerButton onClickEvent={onCLickDeleteDateSpotAction}>削除</DangerButton>
            </ButtonParentDiv>
          )
        }
      </SubDiv>
    </MainDiv>
  );
});
