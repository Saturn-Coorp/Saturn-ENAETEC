const express = require('express')
const router = express.Router()
// =====================================
// Importing the controllers

const {LoadHomePage} = require('../Controllers/UserController')

// =====================================

router.get('/',LoadHomePage)

module.exports = router