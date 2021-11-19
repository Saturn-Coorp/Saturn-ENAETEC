const AdminUser = require('../Models/adminModel')
const Complaint = require('../Models//ComplaintModel')
const jwt = require('jsonwebtoken')
// =====================================


JWT_SECRET = process.env.JWT_SECRET

const LoadLoginPage = (req, res) => {
    res.status(200)
    res.render('AdminLoginPage')
}

const verifyAdminPass = async (req,res) => {
    // Receiving the data
    let password = req.body.pass.trim()

    try{
        let passwordFind = await AdminUser.findOne({password: password})

        if(passwordFind){
            // Creating token
            let token = jwt.sign ({userPassword:password}, JWT_SECRET)

            // Sending the cookie
            res.cookie('token', token, {maxAge:900000, httpOnly: true})

            res.status(200)
            res.render('AdminHome')
        } else {
            res.status(400)
            res.render('ErrorPage', {message:`Senha incorreta!`, url:'/admin/login'})
        }
    } catch(error) {
        res.status(400)
        res.render('ErrorPage', {message:`Senha incorreta!`, url:'/admin/login'})
    }
}

const ShowingTheComplaints = async (req,res) => {
    let type = req.params.type

    // Arrays
    let newComplaints = [];
    let analyzingComplaints = [];
    let approvedComplaints = [];
    let deniedComplaints = [];
    
    try {
        // Receiving all the complaints
        let AllComplaints = await Complaint.find({})

        if(type === 'new'){
  
            // Putting complaints on array
            AllComplaints.forEach(complaint => {
                if(complaint.status === 'enviado'){
                    newComplaints.push(complaint)
                }
            })
        
            res.status(200)
            res.render('Complaints', {complaints:newComplaints})
        }else if(type === 'analyze'){

            // Putting complaints on array
            AllComplaints.forEach(complaint => {
                if(complaint.status === 'analizando'){
                    analyzingComplaints.push(complaint)
                }
            })
        
            res.status(200)
            res.render('Complaints', {complaints:analyzingComplaints})

        }else if(type === 'approved'){

            // Putting complaints on array
            AllComplaints.forEach(complaint => {
                if(complaint.status === 'aprovado'){
                    approvedComplaints.push(complaint)
                }
            })
        
            res.status(200)
            res.render('Complaints', {complaints:approvedComplaints})

        }else{

            // Putting complaints on array
            AllComplaints.forEach(complaint => {
                if(complaint.status === 'negado'){
                    deniedComplaints.push(complaint)
                }
            })
        
            res.status(200)
            res.render('Complaints', {complaints:deniedComplaints})

        }
        
    } catch (error) {
        
        res.status(400)
        res.render('ErrorPage', {message:`Erro ao mostrar as denúncias!`, url:'/admin/login'})
    }
}

module.exports = {LoadLoginPage, verifyAdminPass, ShowingTheComplaints}