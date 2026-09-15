const auth = (req,res,next)=>{
    const token = "";
    if(token){
        next();
    }
    else{
        res.status(401).send("Unauthorized user");
    }
}

module.exports = auth;