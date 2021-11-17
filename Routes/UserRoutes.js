const express = require('express')
const router = express.Router()
// =====================================
// Importing the controllers

const {LoadHomePage,LoadComplaintArea} = require('../Controllers/UserController')

// =====================================

// GET
router.get('/',LoadHomePage)
router.get('/relatar',LoadComplaintArea)

// POST
router.post('/relatar')

module.exports = router