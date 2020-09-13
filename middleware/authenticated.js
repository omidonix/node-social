

exports.isAuthenticated = (req, res, next)=>{
    if(req.user){
        next()
    }
    res.redirect('/users/login');
}




exports.isNotAuthenticated = (req, res, next)=>{
    if(!req.user){
        next()
    }
    res.redirect('/');
}