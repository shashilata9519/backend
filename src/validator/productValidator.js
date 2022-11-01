const {body}=require('express-validator')
const { trusted } = require('mongoose')
const Product=require('../Model/product')

class productValidator{
    static addProduct(){
        return [
            body("productName", "product is required").isString(),
            // body("quantity", "quantity is required").isNumeric(),
            body("price", "price is required").isInt(),
        ]
    }
    static updateProduct(){
        return[
            body("_id","Id is required").isAlphanumeric()
            .custom((_id,{req})=>{
                return Product.findOne({_id:_id})
                        .then((res)=>{
                            if(res){
                                req.product=res
                                return true
                            }
                            else{
                                throw new Error("product does not exit")

                            }
                        })
            }),
           

        ]
    }
}

module.exports=productValidator