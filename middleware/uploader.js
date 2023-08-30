const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
    destination: (req,file,callBackFunc) => {
        callBackFunc(null, './images');
    },
    filename: (res,file,callBackFunc)=> {
        callBackFunc(null, Date.now() + "--" + file.originalname);
    },
});

const upload = multer({storage: fileStorageEngine});

module.exports = {upload}