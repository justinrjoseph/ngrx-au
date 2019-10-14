import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Lesson } from '../models';

@Injectable()
export class LessonService {
  constructor(private http: HttpClient) {}

  getAll(courseId: number, pageNumber = 0, pageSize = 3): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('/api/lessons', {
      params: new HttpParams()
        .set('courseId', courseId.toString())
        .set('sortOrder', 'asc')
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    });
  }
}
