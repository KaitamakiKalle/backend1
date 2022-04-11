/*
Kontrolleri on olio, joka sisältää metodeja. Se tehty siksi, että
saadaan erotettua reitit ja tietokantahakujen sovelluslogiikka toisistaan.
Se on siis arkkitehtuuriratkaisu. Eli saamme aikaan järkevämmän arkkitehtuurin
kun jaamme eri asioita tekevän koodin eri tiedostoihin ja kansioihin.
*/

const Student = require('../models/Student'); // haetaan model

// Tietokannan käsittelymetodit tehdään olion sisään
// metodin nimi on avain ja sen runko on arvo
const StudentController = {
  /* findAll -metodi hakee kaikki opiskelijat
  Student-modelin find-metodilla */
  findAll: (req, res) => {
    Student.find()
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error.message);
      });
  },
  // Opiskelijan haku id:n perusteella
  findById: (req, res) => {
    // id saadaan urlista pyynnön parametreista
    Student.findOne({ _id: req.params.id })
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error.message);
      });
  },
  // Opiskelijan haku opiskelija tunnuksen perusteella
  findByScode: (req, res) => {
    Student.findOne({ studentcode: req.params.studentcode })
      .then((response) => {
        console.log('Find succesfull');
        res.json(response);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error.message);
      });
  },
  // Opiskelijan lisäys kantaan
  add: (req, res) => {
    Student.create(
      req.body /*, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Document added succesfully');
        res.json(response);
      }
    }*/
    )
      .then((response) => {
        console.log('Document added succesfully');
        res.json(response);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error.message);
      });
  },
  // Opiskelijan poisto kannasta id:n perusteella
  del: (req, res) => {
    Student.findOneAndDelete({ _id: req.params.id })
      .then((response) => {
        console.log(
          `Deleted student: ${response.studentcode} ${response.name}`
        );
        res.json(response);
      })
      .catch((error) => {
        console.error(error);
        res.status(400).send(error.message);
      });
  },
  // Opiskelijan valitun kentän päivitys
  update: (req, res) => {
    // Opiskelija haetaan ensin kannasta ja sen jälkeen asetetaan pyynnön bodyn mukainen päivitys opiskelijan tietoihin
    Student.findOneAndUpdate(
      { studentcode: req.params.studentcode },
      { $set: req.body }
    )
      .then((response) => {
        console.log(`Päivitettiin opiskelijan ${response.studentcode} tietoja`);
        res.json(response);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error.message);
      });
  },
  // Opiskelijoiden haku joilla on alle annettu määrä opintopisteitä
  findbelowlimit: (req, res) => {
    Student.find({ studypoints: { $lt: req.params.limit } })
      .then((response) => {
        console.log('Find succesfull');
        res.json(response);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error.message);
      });
  },
  // Arvosanan lisäys opiskelijalle
  addGrade: (req, res) => {
    Student.updateOne(
      { studentcode: req.params.studentcode },
      {
        $push: { grades: req.body },
        // Kun opiskelijalle lisätään arvosana pitää opintopisteitä lisätä mikäli opiskelija on päässyt kurssista läpi
        // Jos arvosana on 0 ei lisätä pisteitä muutoin lisätään 5 pistettä
        $inc: { studypoints: req.body.grade === 0 ? 0 : 5 },
      }
    )
      .then((response) => {
        console.log(`Added grade to sudent succefully`);
        res.json(response);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error.message);
      });
  },
  // Arvosanan muokkaus
  updategrade: (req, res) => {
    // Student.findOneAndUpdate({
    //   studentcode: req.params.studentcode,
    //   coursecode: req.params.coursecode,
    // });
    Student.findOneAndUpdate(
      {
        studentcode: req.params.studentcode,
        'grades.coursecode': req.params.coursecode,
      },
      {
        $set: { 'grades.$.grade': req.body.grade },
        // Kun arvosanaa päivitetään pitää myös opintopisteitä päivittää mikäli opiskelijan arvosana muuttuu 0 ylöspäin jolloin opiskelija
        // onkin läpäissyt kurssin tai jos opiskelijan arvosana muuttuu 0:ksi jolloin kurssi on hylätty
        $inc: {
          studypoints:
            req.body.grade === 0
              ? -5
              : req.body.grade > 0 && 'grades.$.grade' === 0
              ? 5
              : 0,
        },
      }
    )
      .then((response) => {
        console.log(`Succesfully updated grade of ${response.studentcode}`);
        res.json(response);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error.message);
      });
  },
  // Opiskelijoiden haku joilla on tietty kurssi

  findwithcourse: (req, res) => {
    // Student.find({ 'grades.coursecode': req.params.coursecode })
    //   .then((response) => {
    //     console.log('Find succesfull');
    //     res.json(response);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    Student.aggregate([
      {
        $match: { 'grades.coursecode': req.params.coursecode },
      },
    ])
      .then((response) => {
        console.log('Find succesfull');
        res.json(response);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error.message);
      });
  },
};

module.exports = StudentController;

/*
students.js -reittitiedostossa kontrollerin metodia kutsutaan tällä tavalla:
 
router.get('/', StudentController.findAll);
 
jolloin kaikki opiskelijat saadaan JSON-muodossa osoitteesta http://localhost:3000/students/

*/
