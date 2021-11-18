const cloudinary = require('../Utils/Cloudinary')
const Complaint = require('../Models//ComplaintModel')
const AllDistricts = require('../Controllers/Districts')
const {complaintValidate} = require('../Controllers/ValidatingReceivedData')
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
        res.render('ErrorPage', {message:error, url:'/'})
        // `Complete todos os campos!`
    }else{
        let receivedName = req.body.name.trim()
        let receivedCpf = req.body.cpf.trim()
        let receivedContent = req.body.content.trim()
        let receivedDistrict = req.body.district
        let receivedStreet = req.body.street.trim()
        let receivedImage = req.file.path

        let k = String(receivedCpf)

        console.log(k.length )  
        if(!receivedCpf || k.length != 11 || k == "11111111111" || k == "22222222222" || k == "33333333333" || k == "44444444444" || k == "55555555555" || k == "66666666666" || k == "77777777777" || k == "88888888888" || k == "99999999999"){
            res.status(400)
            res.render('ErrorPage', {message:`2!`, url:'/'})
        }

        function verificationCPF(strCPF) {
            let Sum;
            let Rest;
            Sum = 0;
          if (strCPF == "00000000000") return false;
        
          for (i=1; i<=9; i++) Sum = Sum + parseInt(strCPF.substring(i-1, i)) * (11 - i);
          Rest = (Sum * 10) % 11;
        
            if ((Rest == 10) || (Rest == 11))  Rest = 0;
            if (Rest != parseInt(strCPF.substring(9, 10)) ) return false;
        
          Sum = 0;
            for (i = 1; i <= 10; i++) Sum = Sum + parseInt(strCPF.substring(i-1, i)) * (12 - i);
            Rest = (Sum * 10) % 11;
        
            if ((Rest == 10) || (Rest == 11))  Rest = 0;
            if (Rest != parseInt(strCPF.substring(10, 11) ) ) return false;
            return true;
        }
        
        let verify = verificationCPF(receivedCpf)
        console.log(verify)

        

        try {
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
    
            complaint = new Complaint(complaint)
            await complaint.save()
                
            res.status(200)
            res.render('SuccessPage',{message:`Relato enviado !`, url:'/'})
        } catch (error) {
            res.status(400)
            res.render('ErrorPage', {message:`4!`, url:'/'})
        }
    }

    
}

module.exports = {LoadHomePage,LoadComplaintArea,AddNewComplaint}