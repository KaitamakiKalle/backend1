import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
// komponentin luokkaosa joka sisältää ts-sovelluslogiikan
export class AdminComponent implements OnInit {
  students: Array<Student> = []; // taulukko johon opiskelijat tulevat servicestä
  addnew = true;
  saveedited = false;
  opnro = '';
  nimi = '';
  email = '';
  opisteet = '';
  id = '';

  /* konstruktorissa injektoidaan (DI) provider ContactService
     tähän komponenttiin.*/
  constructor(private studentService: StudentService) { }

  getStudents() {
    // haetaan opiskelijat servicen avulla tilaamalla observable
    this.studentService.getStudents().subscribe(data => this.students = data);
  }
  // lähetetään uusi opiskelija tai muokattu opiskelija
  onSubmit(formData: any) {
    console.log(formData);
    // tässä pitää valita onko kyseessä uuden lisäys vai muokkaus
    // servicessä on eri metodit postille ja putille

    // lisätään opiskelija ja laitetaan se heti listaan
    if (this.addnew === true) {
      this.studentService.addStudent({
        'studentcode': formData.opnro,
        'name': formData.nimi,
        'email': formData.email,
        'studypoints': formData.opisteet,
        'grades': [{ // grades on kovakoodattu tähän, koska sitä ei tule käyttöliittymästä
          'coursecode': 'HTS10900',
          'grade': 0,
        }], // samalla kun data tilataan se pushataan komponentin students -taulukkoon
      }).subscribe(data => this.students.push(data));
    }
    // muokataan opiskelijaa ja haetaan heti uusi lista
    if (this.saveedited === true) {
      this.studentService.updateStudent({
        '_id': formData.id,
        'studentcode': formData.opnro,
        'name': formData.nimi,
        'email': formData.email,
        'studypoints': formData.opisteet,
      }).subscribe(() => this.getStudents());
      // this.getStudents();
      // nollataan asetukset
      this.addnew = true;
      this.saveedited = false;
      this.opnro = '';
      this.nimi = '';
      this.email = '';
      this.opisteet = '';
      this.id = '';
    }
  }
  // deletoidaan opiskelija ja haetaan ja pushataan uusi lista
  delete(s: Student) {
    console.log('Poistetaan: ' + s._id);
    this.studentService.delStudent(s._id)
      .subscribe(() => this.getStudents());
  }
  // lomakkeen update -metodi joka asettaa
  // lomekkeelle arvot joita voidaan muokata
  update(s: Student) {
    this.opnro = s.studentcode;
    this.nimi = s.name;
    this.email = s.email;
    this.opisteet = String(s.studypoints);
    this.id = s._id; // _id pitää kuljettaa mukana vaikka sitä ei muokata

    this.addnew = false;
    this.saveedited = true;
  }

  ngOnInit() {
   this.getStudents();
  }

}
