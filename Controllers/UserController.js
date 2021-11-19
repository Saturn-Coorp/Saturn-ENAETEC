const cloudinary = require('../Utils/Cloudinary')
const Complaint = require('../Models//ComplaintModel')
const AllDistricts = require('../Controllers/Districts')
const {complaintValidate,verificationCPF} = require('../Controllers/ValidatingReceivedData')
require('dotenv').config()
// =====================================


const LoadHomePage = (req,res) => {
    res.status(200)
    res.render('HomePage')
}

const LoadComplaintArea = (req,res) => {
    res.status(200)
    res.render('NewComplaint', {Districts:AllDistricts})
}

const AddNewComplaint = async (req,res) => {
    // Cheking if all the inputs are complete!
    const {error} = complaintValidate(req.body)

    if(error){
        res.status(400)
        res.render('ErrorPage', {message:`Complete todos os campos corretamente!`, url:'/'})
    }else{
        // Receiving the ddata from user
        let receivedName = req.body.name.trim()
        let receivedCpf = req.body.cpf.trim()
        let receivedContent = req.body.content.trim()
        let receivedDistrict = req.body.district
        let receivedStreet = req.body.street.trim()
        let receivedImage = req.file.path

        // Validating if is a valid CPF
        let validatingCPF = verificationCPF(receivedCpf)

        if(validatingCPF === true){
            try {
                // Saving the image on cloudnary
                const result =  await cloudinary.uploader.upload(receivedImage)
        
                // Creating a new complaint
                let complaint = {
                    name:receivedName,
                    cpf:receivedCpf,
                    district:receivedDistrict,
                    street:receivedStreet,
                    content:receivedContent,
                    image_url:result.secure_url,
                    cloudinary_id:result.public_id
                }
        
                // Saving the complaint
                complaint = new Complaint(complaint)
                await complaint.save()
                    
                res.status(200)
                res.render('SuccessPage',{message:`Relato enviado !`, url:'/'})
            } catch (error) {
                res.status(400)
                res.render('ErrorPage', {message:`Erro ao enviar relato !`, url:'/'})
            }
        } else{
            res.status(400)
            res.render('ErrorPage', {message:`Coloque um CPF valido!`, url:'/relatar'})
        } 
    }
}

module.exports = {LoadHomePage,LoadComplaintArea,AddNewComplaint}