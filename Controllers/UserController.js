const cloudinary = require('../Utils/Cloudinary')
const Complaint = require('../Models//ComplaintModel')
const AllDistricts = require('../Controllers/Districts')
const {complaintValidate,verificationCPF} = require('../Controllers/ValidatingReceivedData')
require('dotenv').config()
// =====================================*


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
    try {
        let inputName = req.body.name
        let inputCpf = req.body.cpf
        let inputContent = req.body.content
        let inputDistrict = req.body.district
        let inputStreet = req.body.street
        let inputImage = req.file.path
    
        let dataToValidate = {
            name: inputName,
            cpf: inputCpf,
            content: inputContent,
            district: inputDistrict,
            street: inputStreet,
            image: inputImage
        }
    
        let {error} = complaintValidate(dataToValidate)

        // Validating using Joi
        if(error){
            res.status(400)
            res.render('ErrorPage', {message:error, url:'/relatar'})
        }else{
            // Removing all the  spaces before and after
            let receivedName = req.body.name.trim()
            let receivedCpf = req.body.cpf.trim()
            let receivedContent = req.body.content.trim()
            let receivedDistrict = req.body.district.trim()
            let receivedStreet = req.body.street.trim()
            let receivedImage = req.file.path.trim()

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

                    let complaintSaved = await complaint.save()
                        
                    res.status(200)
                    res.render('SuccessPage',{message:`Relato enviado use o codigo: ${complaintSaved.id} para ver o  status! `, url:'/'})
                } catch (error) {
                    res.status(400)
                    res.render('ErrorPage', {message:`Erro ao enviar relato !`, url:'/'})
                }
            } else{
                res.status(400)
                res.render('ErrorPage', {message:`Coloque um CPF valido!`, url:'/relatar'})
            } 
        }
    } catch (error) {
        res.status(400)
        res.render('ErrorPage', {message:`Verifique todos os campos como imagem,nome,cpf etc!`, url:'/relatar'})
    }
}

// Loading the Status Page
const LoadStatusComplaintPage = (req,res) => {
    res.status(200)
    res.render('StatusComplaintPage')
}

// Cheking the status
const CheckTheComplaitStatus = async (req,res) => {

    // Receiving the ID
    let id = req.body.code

    try {
        let complaint = await Complaint.findById(id)

        res.status(200)
        res.render('SuccessPage',{message:`O Status é de : ${complaint.status} `, url:'/'})
    } catch (error) {
        res.status(400)
        res.render('ErrorPage', {message:`Não foi possivel verificar status!`, url:'/verificar'})
    }
}

module.exports = {LoadHomePage,LoadComplaintArea,AddNewComplaint,LoadStatusComplaintPage,CheckTheComplaitStatus}