const express = require('express');

const router = express.Router();
const studentController = require('../controllers/studentcontroller');
//const Student = require('../models/Student');

// Kaikkien opiskelijoiden haku
router.get('/', studentController.findAll);

// Opiskelijan haku id:n perusteella
router.get('/:id', studentController.findById);

// opsikelijan haku opiskelijanumeron perusteella
router.get('/studentcode/:studentcode', studentController.findByScode);

// Opiskelijan lisäys kantaan
router.post('/', studentController.add);

// opiskelijan poisto kannasta
router.delete('/:id', studentController.del);

// Valitun kentän päivittäminen
router.put('/:studentcode/:fieldToUpdate', studentController.update);

// Opiskelijoiden joilla on alle annetun rajan opintopisteitä haku
router.get('/findbelow/:limit', studentController.findbelowlimit);

// Arvosanan lisäys opiskelijalle
router.post('/addgrade/:studentcode', studentController.addGrade);

// Arvosanan muokkaus
router.put(
  '/updategrade/:studentcode/:coursecode',
  studentController.updategrade
);

// Opiskelijoiden haku joilla on tietty kurssi
router.get('/findwithcourse/:coursecode', studentController.findwithcourse);

module.exports = router;
