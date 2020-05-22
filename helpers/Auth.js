module.exports = {
    ensureAunticated: function(req, res, next){
        if(req.isAuthenticated()){
            return next;
        }
        req.flash('error_msg',"You're Not Authorized");
        res.redirect('/users/login');
    }
}