import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Course } from '../../models';

export const coursesRequested = createAction(
  '[Courses Resolver] Courses Requested'
);

export const coursesLoaded = createAction(
  '[Courses API] Courses Loaded',
  props<{ courses: Course[] }>()
);

export const courseUpdated = createAction(
  '[Edit Course Modal] Course Updated',
  props<{ update: Update<Course> }>()
);
