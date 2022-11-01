const {body}=require('express-validator')
const Customer=require("../Model/customer")


class customerValidator{
    static register(){
        return [
            body("email","email is required").isEmail()
            .custom((email,{req})=>{
                return Customer.findOne({email:email}).then((user)=>{
                    if(user){
                        throw new Error("user already exist")
                    }
                    else{
                        return true
                    }
                })
            }),
            body("password","password is required").isAlphanumeric()
            .isLength({
                min:3,
                max:25
            }).withMessage('must be at least 3 char long'),
            body("name","name is required")

        ]
    }

    static login(){
        return[
            body("email","email is required").isEmail()
            .custom((email,{req})=>{
                return Customer.findOne({email:email}).then(customer=>{
                    if(customer){
                        req.customer=customer
                        return true
                    }
                    else{
                        throw new Error('user does not exist')
                    }
                })
            }),
            body('password','password is required').isAlphanumeric()
        ]
    }
}

module.exports=customerValidator