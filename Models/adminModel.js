const mongoose  = require('mongoose')

const adminSchema = new mongoose.Schema({
    password:{type:String}
},{
    collection:'AdminUser'
})

module.exports = mongoose.model('adminUser', adminSchema)