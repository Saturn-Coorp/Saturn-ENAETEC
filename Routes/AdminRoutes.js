const express = require('express')
const methodOverride = require('method-override')
const router = express.Router()
// =====================================
// Importing controllers
const {LoadLoginPage, verifyAdminPass,ShowingTheComplaints} = require('../Controllers/AdminController')
const auth = require('../Controllers/Authentication')
// =====================================
router.use(methodOverride('_method'))

// GET
router.get('/login', LoadLoginPage)
router.get('/complaints/:type',auth, ShowingTheComplaints)

// POST
router.post('/login', verifyAdminPass)

module.exports = router