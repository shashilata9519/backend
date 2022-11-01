const Customer=require('../Model/customer')
const JWT=require('jsonwebtoken')
const Utils = require('../utils/util')

class customerController{
    static async register(req,res,next){
        try {
            // console.log(req.body,'body')
            const newData={...req.body,
            password:await Utils.encryptPassword(req.body.password)}
            // console.log(newData.password)
          
            let register=await new Customer(newData).save()
            const token=JWT.sign({email:register.email,customer_id:register._id,name:register.name},'secret',{expiresIn:'120d'})
            // console.log(token)
            // console.log(register,'register')
            const data={
                _id:register._id,
                name:register.name,
                email:register.email,
                token:token
            }
            res.send(data)

        } catch (error) {
            console.log(error)
            
        }
    }

    static async login(req,res,next){
        const {password,email}=req.body
       const customer=req.customer
    //   console.log(customer,'customer')
    try {
        
        const token=JWT.sign({email,customer_id:customer._id,name:customer.name},'secret',{expiresIn:'120d'})
            await Utils.comparePassword(password,customer.password)
            const data={
                _id:customer._id,
                name:customer.name,
                email:customer.email,
                token:token
            }
            res.send(data)
    } catch (error) {
        next(error)
    }

    }
}

module.exports=customerController