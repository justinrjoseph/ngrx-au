import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CoursesState, getAllCourses } from '../state';

import { Course } from '../../models';

const coursesState = createFeatureSelector<CoursesState>('courses');

export const allCourses = createSelector(
  coursesState,
  getAllCourses
);

export const beginnerCourses = createSelector(
  allCourses,
  (courses: Course[]) => courses.filter((course) => course.category === 'BEGINNER')
);

export const advancedCourses = createSelector(
  allCourses,
  (courses: Course[]) => courses.filter((course) => course.category === 'ADVANCED')
)

export const promoTotal = createSelector(
  allCourses,
  (courses: Course[]) => courses.filter((course) => course.promo).length
);

export const areCoursesLoaded = createSelector(
  coursesState,
  (state: CoursesState) => state.loaded
);
