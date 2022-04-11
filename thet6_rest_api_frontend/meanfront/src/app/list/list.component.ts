import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent {

  students: Array<Student> = []; // opiskelijat tulevat tähän taulukkoon

  /* konstruktorissa injektoidaan (DI) StudentService
tähän komponenttiin.*/
  constructor(private studentService: StudentService) {

    this.studentService.getStudents().subscribe(data => this.students = data);
  }
}
