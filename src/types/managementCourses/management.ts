import { DateSpotData } from 'types/dateSpots/response';
import { UserResponseData } from 'types/users/response';

export type ManagementCourseData = {
  userId: number,
  user?: UserResponseData,
  dateSpots: DateSpotData[]
};

export type CourseInfoData = {
  travelMode: string,
  authority: string,
  noDuplicatePrefectureNames?: string[]
};

export type CurrentDateCourseState = {
  managementCourse: ManagementCourseData,
  courseInfo: CourseInfoData
}