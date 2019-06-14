import Cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const cloudinary = Cloudinary.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_name,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
