

exports.isAuthenticated = (req, res, next)=>{
    if(req.user){
        next()
    }else{
        res.redirect('/users/login');
    }
}




exports.isNotAuthenticated = (req, res, next)=>{
    if(!req.user){
        next()
    }
    else{
        res.redirect('/');
    }
}