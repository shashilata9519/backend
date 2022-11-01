const Product=require('../Model/product')

class productController{
    static async addProduct(req,res,next){

        try {
            let data={
                image1:req.files[0].path,
                image2:req.files[1].path
               
            }
            console.log(data)
           
            let product=await new Product({
                ...req.body,
               image1:req.files[0].path.replace(/\\/g,"/"),
               image2:req.files[1].path.replace(/\\/g,"/")
                
             
            }).save()
            console.log(req.body)
            res.send(product)
        } catch (error) {
            res.send(error)
        }
    }

    static  async showProduct(req,res,next){
        try {
            let product=await Product.find({})
            res.send(product)
            
        } catch (error) {
            res.send(error)
            
        }
    }

    static async deleteProduct(req,res,next){
        try {

            const delProduct=await Product.deleteOne({_id:req.params.id})
            console.log({_id:req.params.id})
            res.send(delProduct)            
        } catch (error) {
            res.send(error)
            
        }

    }

    static async createProductReview(req,res,next){
        console.log(req.body)
        try {
            let review_product=await Product.findById({_id:req.body.productId})
           res.send(review_product)
            console.log(review_product)
            if (review_product) {
                const alreadyReview = review_product.reviews.find(
                  (x) => x.user.toString() === req.user.customer_id.toString()
                );   
                console.log(alreadyReview);
                if (alreadyReview) {
                  // console.log('product already reviewed')
                  next(new Error("product already reviewed"));
                }
                console.log(req.user,'user')
                console.log(req.body,'body')
            const review={
                name:req.user.name,
                rating:req.body.rating,
                comment:req.body.comment,
                user:req.user.customer_id
            }
            console.log(review)
                review_product.reviews.push(review);
                review_product.totalReview = review_product.reviews.length;
                review_product.rating =review_product.reviews.reduce((sum, item) => item.rating + sum, 0) /review_product.reviews.length;
                    
                await review_product.save();

        res.send({ msg: "Review Added" });
            
            
        }
     } catch (error) {
            next(error)
            
        }
    }

    static async updateProduct(req,res,next){
        try {
            console.log(req.body._id)
            let update_product=await Product.findByIdAndUpdate(
                req.body._id,
                req.body
            )
           
            res.send("update successfully")
            
        } catch (error) {
            res.send(error)
        }

    }
}
module.exports=productController