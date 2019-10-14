import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { defaultDialogConfig } from '../shared/default-dialog-config';

import { Course } from '../models';

import { CourseService } from '../services';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {
  @Input() courses: Course[];

  @Output() courseChanged = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private _courseService: CourseService
  ) {}

  ngOnInit() {

  }

  editCourse(course: Course) {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Edit Course',
      course,
      mode: 'update'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.courseChanged.emit());
  }

  onDeleteCourse(course: Course) {

  }
}









