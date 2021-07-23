const user_getRegister = (req,res,next)=>{
    res.render('user/register')
}

const user_getLogin = (req,res,next)=>{
    res.render('user/login')
}

const user_getLogout = (req,res,next)=>{
    req.logout()
    res.redirect('/user/login')
}
module.exports = {
    user_getRegister,
    user_getLogin,
    user_getLogout
}