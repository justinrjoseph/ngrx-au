import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { Course, compareCourses } from '../../models';

export interface CoursesState extends EntityState<Course> {
  loaded: boolean;
}

export const courseAdapter = createEntityAdapter<Course>({
  sortComparer: compareCourses
});

export const INITIAL_COURSES_STATE = courseAdapter.getInitialState({
  loaded: false
});

export const {
  selectAll: getAllCourses
} = courseAdapter.getSelectors();
