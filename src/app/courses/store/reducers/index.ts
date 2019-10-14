import { createReducer, on } from '@ngrx/store';

import { INITIAL_COURSES_STATE, courseAdapter } from '../state';

import { coursesLoaded, courseUpdated } from './../actions';

export const coursesReducer = createReducer(
  INITIAL_COURSES_STATE,
  on(coursesLoaded, (state, action) => {
    return courseAdapter.addAll(action.courses, {
      ...state,
      loaded: true
    });
  }),
  on(courseUpdated, (state, action) => {
    return courseAdapter.updateOne(action.update, state);
  })
);
