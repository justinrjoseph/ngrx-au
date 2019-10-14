import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/state';

import { Observable } from 'rxjs';
import { tap, filter, first } from 'rxjs/operators';

import { coursesRequested } from '../store/actions';
import { areCoursesLoaded } from '../store/selectors';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
  constructor(private _store: Store<AppState>) {}

  resolve(): Observable<boolean> {
    return this._store.select(areCoursesLoaded)
      .pipe(
        tap((loaded: boolean) => {
          if ( !loaded ) this._store.dispatch(coursesRequested());
        }),
        filter((loaded: boolean) => loaded),
        first()
      );
  }
}
