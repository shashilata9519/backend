const express=require('express')
const mongoose = require("mongoose");
const cors=require('cors')
const bodyParser = require("body-parser");
const customerRouter = require('./Router/customerRouter');
const productRouter = require('./Router/productRouter');
class Server{
    app=express() //middleware

    constructor(){
        this.setConfiguration()
        this.setRouter()
        this.handleErrors()
        
    }

    setConfiguration(){
        this.configBodyParser()
        this.connectMongoDB()

    }

    setRouter(){
        this.app.use('/api/customer',customerRouter)
        this.app.use('/api/product',productRouter)

    }

    configBodyParser(){
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(cors())
        this.app.use(bodyParser.json());
        this.app.use(express.json());
       
    }
    
    async connectMongoDB() {
        try {
          const status = await mongoose.connect(
            "mongodb+srv://ecom:ecom@cluster.mddkxl9.mongodb.net/?retryWrites=true&w=majority",
            { useNewUrlParser: true, useUnifiedTopology: true }
          );
          if (status) {
            console.log("database is connected");
          }
        } catch (err) {
          console.log(err);
        }
      }
      handleErrors(){
        this.app.use((error,req,res,next)=>{
            let errorStatus=req.errorStatus || 500
         res.status(errorStatus).json({
             message:error.message,
             status_code:errorStatus
         })
        })
        
    }
    


}

module.exports=Server