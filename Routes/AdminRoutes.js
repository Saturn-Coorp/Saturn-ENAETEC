const express = require('express')
const methodOverride = require('method-override')
const router = express.Router()
// =====================================
// Importing controllers
const {LoadLoginPage} = require('../Controllers/AdminController')

// =====================================
router.use(methodOverride('_method'))

// GET
router.get('/login', LoadLoginPage)

// POST


module.exports = router