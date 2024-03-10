const jwt = require('jsonwebtoken');
JWT_SECRET='byali';

const fetchUser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(token){
        const compare=jwt.verify(token,JWT_SECRET);
        req.user=compare;
        next();
    }
    else{
        res.status(401).send({error:"Login first to use this functionality."});
    }
}

module.exports=fetchUser;