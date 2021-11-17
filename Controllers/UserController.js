
const LoadHomePage = (req,res) => {
    res.status(200)
    res.render('HomePage')
}

const LoadComplaintArea = (req,res) => {
    res.status(200)
    res.render('NewComplaint')
}

module.exports = {LoadHomePage,LoadComplaintArea}