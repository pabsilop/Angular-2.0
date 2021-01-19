import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/models/student.class';
import { StudentsService } from 'src/app/services/students.service';
import { StudentCreateEditDialogComponent } from '../student-create-edit-dialog/student-create-edit-dialog.component';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  studentsList: Student[];
  dataSource = new MatTableDataSource<Student>();
  displayedColumns: string[] = ['first-name', 'last-name', 'age', 'course','actions'];

  constructor(private studensService: StudentsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.studensService.getStudents().subscribe(resp => {
      this.studentsList = resp.map(elem =>  {
        return {
          id: elem.payload.doc.id,
          data: elem.payload.doc.data() 
        } as Student;
      });
      this.dataSource.data = this.studentsList;
    });
  }

  editStudent(studentToEdit: Student) {
    let dialogRef = this.dialog.open(StudentCreateEditDialogComponent, {
      data: { student: studentToEdit, title: 'Edit student', buttonText: 'Save' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        alert('Han pulsado en Save');
      }
    });
  }

  addStudent() {
    let dialogRef = this.dialog.open(StudentCreateEditDialogComponent, {
      data: { title: 'New student', buttonText: 'Create' },
    });
  }

}
