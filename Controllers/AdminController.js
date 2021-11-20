const AdminUser = require('../Models/adminModel')
const cloudinary = require('../Utils/Cloudinary')
const Complaint = require('../Models//ComplaintModel')
const jwt = require('jsonwebtoken')
// =====================================


JWT_SECRET = process.env.JWT_SECRET

const LoadLoginPage = (req, res) => {
    res.status(200)
    res.redirect('/admin/menu')
}

const LoadAdminMenu = (req,res) => {
    res.status(200)
    res.render('AdminHome')
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
            res.cookie('token', token, {maxAge:3600000, httpOnly: true})

            res.status(200)
            res.render('AdminHome')
        } else {
            res.status(400)
            res.render('ErrorPage', {message:`Senha incorreta!`, url:'/admin/menu'})
        }
    } catch(error) {
        res.status(400)
        res.render('ErrorPage', {message:`Senha incorreta!`, url:'/admin/menu'})
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
        res.render('ErrorPage', {message:`Erro ao mostrar as denúncias!`, url:'/admin/menu'})
    }
}

const ViewTheComplaint = async (req,res) => {
    let id = req.params.id

    try {
        let findComplaint = await Complaint.findById(id)

        // Getting the status
        let complaintStatus = findComplaint.status


        if(complaintStatus === 'enviado'){
            // Creating the buttons
            var buttons = [
                {
                    message:'Enviar para analise',
                    btnType:'btn-warning',
                    url:`/admin/updatestatus/${id}/analizando`
                },{
                    message:'Negar denúncia',
                    btnType:'btn-danger',
                    url:`/admin/updatestatus/${id}/negado`
                }
            ]

        }else if(complaintStatus === 'analizando'){
            var buttons = [
                {
                    message:'Aprovar denúncia',
                    btnType:'btn-success',
                    url:`/admin/updatestatus/${id}/aprovado`
                },{
                    message:'Negar denuncia',
                    btnType:'btn-danger',
                    url:`/admin/updatestatus/${id}/negado`
                }
            ]
        }else{
            var buttons = [
                {
                    message:'Deletar',
                    btnType:'btn-danger',
                    url:`/admin/deletecomplaint/${id}`
                }
            ]
        }

        res.status(200)
        res.render('ViewComplaint', {complaint:findComplaint, buttons:buttons,})
    } catch (error) {
        res.status(400)
        res.render('ErrorPage', {message:`Não foi posivel carregar a denúncia!`, url:'/admin/menu'})
    }
}

const updateTheStatus = async (req,res) => {
    // Receiving the params
    let id = req.params.id
    let updatedStatus = req.params.status

    try {
        let complaint = await Complaint.findByIdAndUpdate(id, {status:updatedStatus})


        res.status(200)
        res.render('SuccessPage',{message:`Denúncia atualizada! `, url:'/admin/menu'})
    }catch (error) {
        res.status(400)
        res.render('ErrorPage', {message:`Não foi posivel atualizar o status!`, url:'/admin/menu'})
    }
}

const deleteComplaint = async (req,res) => {
    let id = req.params.id

    try {
        // Getting the data
        let complaint = await Complaint.findById(id)

        // Deleting the Image
        await cloudinary.uploader.destroy(complaint.cloudinary_id)

        // Deleting the data
        await complaint.remove()

        res.status(200)
        res.render('SuccessPage',{message:`Denúncia deletada! `, url:'/admin/menu'})
    } catch (error) {
        res.status(400)
        res.render('ErrorPage', {message:`Não foi posivel deletar essa denúncia!`, url:'/admin/menu'})
    }
}

module.exports = {LoadLoginPage, verifyAdminPass, ShowingTheComplaints,ViewTheComplaint,updateTheStatus,LoadAdminMenu,deleteComplaint}