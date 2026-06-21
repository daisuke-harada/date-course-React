import { DateSpotData, DateSpotResponseData } from "types/dateSpots/response";

export const initialDateSpot: DateSpotResponseData = {
  id: 0,
  name: '',
  genreId: 0,
  image: {
    url: null
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const initialDateSpotData: DateSpotData = {
  id: 0,
  name: '',
  genreId: 0,
  image: { url: null },
  createdAt: new Date(),
  updatedAt: new Date(),
  cityName: '',
  prefectureName: '',
  latitude: 0,
  longitude: 0,
  genreName: '',
  reviewTotalNumber: 0,
  averageRate: 0,
};