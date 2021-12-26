module.exports.home = (req, res, next) => {
    console.log('user', req.user)
    res.render("misc/home")
}