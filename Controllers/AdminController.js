const AdminUser = require('../Models/adminModel')
const jwt = require('jsonwebtoken')



JWT_SECRET = process.env.JWT_SECRET

const LoadLoginPage = (req, res) => {
    res.status(200)
    res.render('AdminLoginPage')
}

const verifyAdminPass = async (req, res) => {
    let password = req.body.pass

    try{
        let passwordFind = await AdminUser.findOne({password: password})

        if(passwordFind){
            let token = jwt.sign ({userPassword:password}, JWT_SECRET)

            res.coockie('token', token, {maxAge:900000, httpOnly: true})
            res.status(200)
            res.render('AdminHome')
        } else {
            res.status(400)
            res.render('ErrorPage', {message:'sim'})
        }
    } catch(error) {
        res.status(400)
        res.render('ErrorPage', {message:'sim'})
    }
}


module.exports = {LoadLoginPage, verifyAdminPass}