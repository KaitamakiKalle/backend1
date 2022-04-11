const connection = require('./dbconnection');

const Dbmethods = {
  /*metodi on esitetty oliosyntaksilla eli se on olion sisältämä avain:arvo -pari.
    callback on anonyymi funktio jolla käsitellään kyselyn tulos. Se luodaan
    tiedostoon jossa tämä metodi suoritetaan (add.js)*/

  // add lisää opiskelijan kantaan
  add: function (studentcode, name, email, studypoints, callback) {
    return connection.query(
      'insert into Students set studentcode = ?, name = ?, email = ?, studypoints = ?',
      [studentcode, name, email, studypoints],
      callback
    );
  },
  // del poistaa opiskelijan kannasa
  del: function (studentcode, callback) {
    return connection.query(
      'DELETE FROM Students WHERE studentcode = ?',
      [studentcode],
      callback
    );
  },
  // delgrades poistaa opiskelijan arvosanat kannasta
  delGrades: function (studentcode, callback) {
    connection.query(
      'DELETE FROM Grades WHERE studentcode = ?',
      [studentcode],
      callback
    );
  },
  // findall hakee kaikki opiskelijat
  findAll: function (callback) {
    return connection.query('SELECT * FROM Students', callback);
  },
  // addpoints lisää opiskelijan opintopisteitä
  addPoints: function (studentcode, studypoints, callback) {
    return connection.query(
      'UPDATE Students SET studypoints = studypoints + ? WHERE studentcode = ?',
      [studypoints, studentcode],
      callback
    );
  },
  // addgrade lisää opiskelijalle arvosanan
  addGrade: function (studentcode, coursecode, grade, callback) {
    return connection.query(
      'INSERT INTO Grades SET studentcode = ?, coursecode = ?, grade = ?',
      [studentcode, coursecode, grade],
      callback
    );
  },
  // findbelowlimit hakee opiskelijat joilla on vähemmän opintopisteitä kuin annettu määrä
  findBelowLimit: function (studypoints, callback) {
    return connection.query(
      'SELECT * FROM Students WHERE studypoints < ?',
      [studypoints],
      callback
    );
  },
  // updateGrade päivittää opiskelijan arvosanaa
  updateGrade: function (studentcode, coursecode, grade) {
    return connection.query(
      'UPDATE Grades SET grade = ? WHERE studentocde = ? AND coursecode = ?',
      [grade, studentcode, coursecode],
      callback
    );
  },
  // updatepoints päivittää opiskelijan opintopisteitä
  updatePoints: function (studentcode, studypoints, callback) {
    return connection.query(
      'UPDATE Students SET studypoints = ? WHERE studentcode = ?',
      [studypoints, studentcode],
      callback
    );
  },
  // Tee tähän muut metodit
};
module.exports = Dbmethods;
