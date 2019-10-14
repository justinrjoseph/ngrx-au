import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { AppState } from '../../store/state';

import { Course } from '../models';

import { promoTotal, beginnerCourses, advancedCourses } from '../store/selectors';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    private _store: Store<AppState>
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.promoTotal$ = this._store.select(promoTotal);
    this.beginnerCourses$ = this._store.select(beginnerCourses);
    this.advancedCourses$ = this._store.select(advancedCourses);
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
