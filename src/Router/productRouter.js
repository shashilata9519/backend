const {Router}=require('express');
const productController = require('../Controller/productController');
const GlobalMiddleware = require('../globalMiddleware/globalMiddleware');
const Utils = require('../utils/util');
const productValidator = require('../validator/productValidator');

class productRouter{
    router;
    constructor(){
        this.router=Router()
        this.postRouter()
        this.getRouter()
        this.deleteRouter()
        this.patchRouter()
    }

    getRouter(){
        this.router.get('/showproduct',productController.showProduct)
    }

    postRouter(){
        this.router.post('/addproduct',GlobalMiddleware.authenticate,Utils.multer.array('image1',2),productValidator.addProduct(),GlobalMiddleware.checkError,productController.addProduct)
        this.router.post('/review',GlobalMiddleware.authenticate,GlobalMiddleware.checkError,productController.createProductReview)
    }
    deleteRouter(){
        this.router.delete('/deleteproduct/:id',productController.deleteProduct)
    }
    patchRouter(){
        this.router.patch('/updateproduct/:id',productValidator.updateProduct(),GlobalMiddleware.checkError,productController.updateProduct)
    }
    
}

module.exports=new productRouter().router