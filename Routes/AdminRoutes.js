const express = require('express')
const methodOverride = require('method-override')
const router = express.Router()
// =====================================
// Importing controllers
const {LoadLoginPage, verifyAdminPass} = require('../Controllers/AdminController')

// =====================================
router.use(methodOverride('_method'))

// GET
router.get('/login', LoadLoginPage)

// POST
router.post('/login', verifyAdminPass)

module.exports = router