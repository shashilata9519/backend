const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    productName:{type:String},
    price:{type:Number,default:0},
    image1:{type:String},
    image2:{type:String},
    rating:{type:Number,default:0},
    totalReview:{type:Number,default:0},
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"Customer"
            },
            name:{type:String},
            rating:{type:Number},
            comment:{type:String}
        }
    ]
   
})

module.exports=mongoose.model("productlist",productSchema)