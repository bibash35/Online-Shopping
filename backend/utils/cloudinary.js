// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");

// cloudinary.config({
//   cloud_name: "dazzb8zud",
//   api_key: "294573939818466",
//   api_secret: "_LDMl7Ul49L4O30ZVKp6roOeBlE",
// });
// exports.uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;
//     // upload the file on cloudinary;
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });
//     return response;

//     // file has been uploades successfully
//   } catch (error) {
//     fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operations got faild
//     return null;
//   }
// };

const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "dazzb8zud",
  api_key: "294573939818466",
  api_secret: "_LDMl7Ul49L4O30ZVKp6roOeBlE",
});

exports.uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    fs.unlinkSync(localFilePath); // clean up local file
    return result;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return null;
  }
};
