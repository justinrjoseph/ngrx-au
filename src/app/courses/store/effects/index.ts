import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map } from 'rxjs/operators';

import { coursesRequested, coursesLoaded, courseUpdated } from '../actions';
import { CourseService } from '../../services';

import { Course } from '../../models';

@Injectable()
export class CourseEffects {
  coursesRequested$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(coursesRequested),
      concatMap(() => this._service.getAll()),
      map((courses: Course[]) => coursesLoaded({ courses }))
    );
  });

  courseUpdated$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(courseUpdated),
      concatMap((action) => {
        const { id, changes } = action.update;

        return this._service.save(id, changes);
      })
    );
  }, { dispatch: false });

  constructor(private _actions$: Actions, private _service: CourseService) {}
}
