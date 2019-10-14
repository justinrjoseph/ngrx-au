import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, concatMap } from 'rxjs/operators';

import { CourseService, LessonService } from '../services';

import { Course, Lesson } from '../models';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  course$: Observable<Course>;

  lessons$: Observable<Lesson>;

  displayedColumns = ['seqNo', 'description', 'duration'];

  constructor(
    private route: ActivatedRoute,
    private _courseService: CourseService,
    private _lessonService: LessonService
  ) {}

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');

    this.course$ = this._courseService.getByUrl(courseUrl);

    this.lessons$ = this.course$.pipe(
      concatMap(course => this._lessonService.getAll(course.id)),
      tap(console.log)
    );
  }

  loadLessonsPage(course: Course) {

  }
}
