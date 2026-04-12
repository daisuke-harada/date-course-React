import { CourseInfoData, CurrentDateCourseState, ManagementCourseData } from "types/managementCourses/management";

import { initialDateSpotData } from "defaults/dateSpotDefaults";
import { initialUser } from "defaults/userDefaults";

export const initialManagementCourse: ManagementCourseData = {
  userId: 0,
  user: initialUser,
  dateSpots: [initialDateSpotData],
};

export const initialCourseInfo: CourseInfoData = {
  travelMode: 'DRIVEING',
  authority: '非公開',
  noDuplicatePrefectureNames: [],
};

export const initialCurrentDateCourseState: CurrentDateCourseState = {
  managementCourse: initialManagementCourse,
  courseInfo: initialCourseInfo
}