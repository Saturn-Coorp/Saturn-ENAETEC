const express = require('express')
const methodOverride = require('method-override')
const router = express.Router()
const upload = require('../Utils/Multer')
// =====================================
// Importing the controllers

const {LoadHomePage,LoadComplaintArea,AddNewComplaint,LoadStatusComplaintPage,CheckTheComplaitStatus} = require('../Controllers/UserController')

// =====================================
router.use(methodOverride('_method'))

// GET
router.get('/',LoadHomePage)
router.get('/relatar',LoadComplaintArea)
router.get('/verificar',LoadStatusComplaintPage)

// POST
router.post('/relatar',upload.single('image'),AddNewComplaint)
router.post('/verificar',CheckTheComplaitStatus)

module.exports = router