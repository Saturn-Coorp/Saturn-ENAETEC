const mongoose = require('mongoose')

const complaintSchema = new mongoose.Schema({
    name:{type:String},
    cpf:{type:Number},
    district:{type:String},
    street:{type:String},
    content:{type:String},
    image_url:{type:String},
    cloudinary_id:{type:String},
})

module.exports = mongoose.model('Complaint', complaintSchema)