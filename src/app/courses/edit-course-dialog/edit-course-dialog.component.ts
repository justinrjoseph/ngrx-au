import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { AppState } from '../../store/state';

import { courseUpdated } from '../store/actions';

import { Course } from '../models';

@Component({
  selector: 'course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.css']
})
export class EditCourseDialogComponent {
  form: FormGroup;

  dialogTitle: string;

  course: Course;

  mode: 'create' | 'update';

  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private _store: Store<AppState>) {

    this.dialogTitle = data.dialogTitle;
    this.course = data.course;
    this.mode = data.mode;

    const formControls = {
      description: ['', Validators.required],
      category: ['', Validators.required],
      longDescription: ['', Validators.required],
      promo: ['', []]
    };

    if ( this.mode === 'update' ) {
      this.form = this.fb.group(formControls);

      this.form.patchValue({...data.course});
    } else if ( this.mode === 'create' ) {
      this.form = this.fb.group({
        ...formControls,
        url: ['', Validators.required],
        iconUrl: ['', Validators.required]
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    const changes: Course = {
      ...this.course,
      ...this.form.value
    };

    const update: Update<Course> = {
      id: this.course.id,
      changes
    };

    this._store.dispatch(courseUpdated({ update }));

    this.dialogRef.close();
  }
}
