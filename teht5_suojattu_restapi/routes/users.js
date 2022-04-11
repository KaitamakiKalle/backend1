const express = require('express');

const router = express.Router();
const userController = require('../controllers/usercontroller');

// Reitti käyttäjän rekisteröintiin
router.post('/register', userController.registerUser);

// Reitti kirjautumista varten
router.post('/login', userController.authenticateUser);

module.exports = router;
