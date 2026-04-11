export type DateSpotResponseData = {
  id: number,
  name: string,
  genreId: number,
  image?: {
    url: string | null
  },
  openingTime?: Date,
  closingTime?: Date,
  createdAt: Date,
  updatedAt: Date,
};

export type AddressResponseData = {
  id: number,
  cityName: string,
  prefectureId: number,
  dateSpotId: number,
  latitude: number,
  longitude: number,
  createdAt: Date,
  updatedAt: Date,
};

export type AddressAndDateSpotJoinData = {
  id: number,
  name: string,
  genreId: number,
  image?: {
    url: string | null
  },
  openingTime?: Date,
  closingTime?: Date,
  createdAt: Date,
  updatedAt: Date,
  cityName: string,
  prefectureName: string,
  latitude: number,
  longitude: number,
  genreName: string,
  reviewTotalNumber: number,
  averageRate: number,
};