import '@babel/polyfill';
import cloudinary from './cloudinarySetup';

const cloudinaryUpload = async (req, res, next) => {
  try {
    await cloudinary.v2.uploader.upload(req.files[0].path, (error, result) => {
      req.body.image_url = 'http://res.cloudinary.com/dolapo/image/upload/v1563270605/tni2saqewiv5l5ljnsvj.jpg';
    });
  } catch (err) {
    return err;
  }

  return next();
};

export default cloudinaryUpload;
