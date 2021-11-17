module.exports = (req,res) => {
    res.status(400)
    res.render('ErrorPage', {message:`404 Essa rota não existe!`, url:'/'})
}