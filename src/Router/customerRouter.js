const {Router}=require('express');
const customerController = require('../Controller/customerController');
const GlobalMiddleware = require('../globalMiddleware/globalMiddleware');

const customerValidator = require('../validator/customerValidator');


class customerRouter{
    router;
    constructor() {
        this.router=Router();
        this.postRouter()
        
    }

    postRouter(){
        this.router.post('/register',customerValidator.register(),GlobalMiddleware.checkError,customerController.register)
        this.router.post('/login',customerValidator.login(),GlobalMiddleware.checkError,customerController.login)
    }
}
module.exports=new customerRouter().router;