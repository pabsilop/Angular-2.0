import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.class';

export interface DialogStudentInput {
  student: Student;
  title: string;
  buttonText: string;
}

@Component({
  selector: 'app-student-create-edit-dialog',
  templateUrl: './student-create-edit-dialog.component.html',
  styleUrls: ['./student-create-edit-dialog.component.css']
})
export class StudentCreateEditDialogComponent implements OnInit {
  form: FormGroup;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogStudentInput,
    public dialogRef: MatDialogRef<StudentCreateEditDialogComponent>,
    private readonly fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: ['helloworld'],      
      password: ['']
    });
   }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close(false);
  }

  save() {
    this.dialogRef.close(true);
  }

}
