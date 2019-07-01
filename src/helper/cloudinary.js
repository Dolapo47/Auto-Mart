import '@babel/polyfill';
import cloudinary from './cloudinarySetup';

const cloudinaryUpload = async (req, res, next) => {
  try {
    await cloudinary.v2.uploader.upload(req.files[0].path, (error, result) => {
      req.body.imageUrl = result.url;
    });
  } catch (err) {
    return err;
  }

  return next();
};

export default cloudinaryUpload;
