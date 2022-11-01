const JWT=require('jsonwebtoken')
const {validationResult}=require('express-validator');


class GlobalMiddleware{
    static checkError(req,res,next){
        
        const error =validationResult(req)
        if (!error.isEmpty()) {                         
            // console.log(error.array(),'error')
            next(new Error(error.array()[0].msg));
        } else {
            next();
        }
    }

    static async authenticate(req,res,next){
        const authHeader=req.headers.authorization;
        const token=authHeader?authHeader:null
        // console.log(authHeader)
        try {
            JWT.verify(token,'secret',((err,decoded)=>{
                if(err){
                    next(err)
                }else if(!decoded){
                    req.errorStatus=401,
                    next(new Error('user not authorised'))
                }
                else{
                    req.user=decoded
                    next()
                }
            }))

        } catch (error) {
            req.errorStatus=401
            next(error)
        }
    }
}

module.exports=GlobalMiddleware