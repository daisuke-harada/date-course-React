import { DateSpotResponseData, DateSpotData } from "types/dateSpots/response"


export const defaultDateSpotData: DateSpotResponseData = {
  id: 0,
  name: '',
  genreId: 0,
  openingTime: new Date('2017/11/27 20:30'),
  closingTime: new Date('2017/11/27 20:30'),
  createdAt: new Date('2017/11/27 20:30'),
  updatedAt: new Date('2017/11/27 20:30'),
}

export const defaultDateSpot: DateSpotData = {
  id: 0,
  name: '',
  genreId: 0,
  image: { url: null },
  openingTime: undefined,
  closingTime: undefined,
  createdAt: new Date('2017/11/27 20:30'),
  updatedAt: new Date('2017/11/27 20:30'),
  cityName: '',
  prefectureName: '',
  latitude: 0,
  longitude: 0,
  genreName: '',
  reviewTotalNumber: 0,
  averageRate: 0,
}
