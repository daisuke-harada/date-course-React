import { AddressAndDateSpotJoinData } from "types/dateSpots/response";

export const defaultAddressAndDateSpotJoinData: AddressAndDateSpotJoinData = {
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