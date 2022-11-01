const bcrypt=require('bcrypt')
const Multer=require('multer')

const storage=Multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"./src/uploads")
  },
  filename:function(req,file,cb){
    cb(null,file.originalname)
  }
})

const fileFilter=(req,file,cb)=>{
  if(file.mimetype==='image/jpeg' || file.mimetype==="image/png"){
    cb(null,true)
  }
  else{
    cb(null,false)
  }
  
}

class Utils{
    static encryptPassword(password){
        return new Promise((resolve,reject)=>{
        bcrypt.hash(password,10,(err,hash)=>{
            if(err){
                reject(err)
            }else{
                resolve(hash)
            }
        })
        })
    }


    static comparePassword(plainPass, encryptPass) {
        return new Promise((resolve, reject) => {
          bcrypt.compare(plainPass, encryptPass, (err, isSame) => {
            if (err) {
              reject(err);
            } else if (!isSame) {
              reject(new Error("user and password does not match"));
            } else {
              resolve(true);
            }
          });
        });
      }

      static multer=Multer({
        storage:storage,
        fileFilter:fileFilter
      })
      
      
}

module.exports=Utils