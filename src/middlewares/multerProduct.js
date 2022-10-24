const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/image');
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName)
    }
});
const filterFile = (req, file, cb) => {
    const acceptedFiles = ['image/jpeg', 'image/jpg', 'image/png'];
    if(acceptedFiles.includes(file.mimetype)){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const uploadFile = multer({
    storage: storage, 
    filterFile: filterFile
});

module.exports = uploadFile;