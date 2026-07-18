const multer = require("multer");
const storage = multer.diskStorage({
destination:function (req,file,cb) {
    cb(null,"https://xfatxafymmktmkskowxw.storage.supabase.co/storage/v1/s3");
},
filename: function(req,file,cb){
    cb(null,file.originalname)
}
});
const upload = multer({
    storage:storage
});
module.exports = upload;