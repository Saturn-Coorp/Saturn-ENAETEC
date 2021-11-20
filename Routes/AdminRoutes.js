const express = require('express')
const methodOverride = require('method-override')
const router = express.Router()
// =====================================
// Importing controllers
const {LoadLoginPage, verifyAdminPass,ShowingTheComplaints,ViewTheComplaint,updateTheStatus,LoadAdminMenu,deleteComplaint} = require('../Controllers/AdminController')
const auth = require('../Controllers/Authentication')
// =====================================
router.use(methodOverride('_method'))

// GET
router.get('/login', LoadLoginPage)
router.get('/menu',auth ,LoadAdminMenu)
router.get('/complaints/:type',auth, ShowingTheComplaints)
router.get('/view/:id',auth,ViewTheComplaint)

// UPDATING STATUS
router.get('/updatestatus/:id/:status',auth,updateTheStatus)

// DELETING THE COMPLAINT
router.get('/deletecomplaint/:id',auth,deleteComplaint)
// POST
router.post('/login', verifyAdminPass)

module.exports = router