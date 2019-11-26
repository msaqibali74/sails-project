module.exports=function(req,res,next)
{
    //req.session.authenticated=true;
    if(req.session.userId)
    {
        return next();
    }
    else
    {
        res.json("Not authenticated");
    }
}