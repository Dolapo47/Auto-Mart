import multer from 'multer';

const multerUpload = multer({
  storage: multer.diskStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpg|jpeg|png|gif$i/)) {
      cb(new Error('File is not supported'), false);
    }
    cb(null, true);
  }
});

export default multerUpload;
