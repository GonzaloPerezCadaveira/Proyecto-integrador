const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/image/avatars');
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName)
    }
});



const uploadFile = multer({storage:storage});

module.exports = uploadFile;