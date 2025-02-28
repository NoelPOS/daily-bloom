import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// For client-side file conversion
export const convertToBase64Client = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// For server-side file handling
export const uploadToCloudinary = async (file) => {
  try {
    if (!file) return null;
    
    // If we receive base64 data
    if (typeof file === 'string' && file.startsWith('data:')) {
      const result = await cloudinary.uploader.upload(file, {
        folder: 'habits'
      });
      return result.secure_url;
    }
    
    // If we receive a buffer, convert it to base64
    if (Buffer.isBuffer(file)) {
      const base64String = `data:image/jpeg;base64,${file.toString('base64')}`;
      const result = await cloudinary.uploader.upload(base64String, {
        folder: 'habits'
      });
      return result.secure_url;
    }

    return null;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};