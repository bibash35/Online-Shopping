
// const Product = require("../model/Product");
// const path = require("path");
// const fs = require("fs");

// const fetchProducts = async (req, res) => {

//   let product=await Product.find();
// res.send(product)

 
// }
// const storeProduct = async (req, res) => {
   
    
//     try {
//       let imagePath = null;
  
//       if (req.files?.image) {
//         let rootPath = path.resolve();
//         let uniqueTimestap = Date.now() + Math.floor(Math.random() * 1000);
  
//         imagePath = path
//           .join("/", "uploads", `${uniqueTimestap}-${req.files.image.name}`)
//           .replaceAll("\\", "/");
//         req.files.image.mv(path.join(rootPath, imagePath));
//       }

// let product=await Product.create({
//     ...req.body,
//     image: imagePath,

//   });
// res.send(product)
// }catch(err){
//     console.log(err)

// }
// }


// const updateProduct = async (req, res) => {
//   try {
//     const { _id } = req.params;
//     const { name, category, price, description } = req.body;

//     const product = await Product.findById(_id);

//     if (!product) {
//       return res.status(404).send({ message: "Product not found" });
//     }

//     let imagePath = product.image;

//     if (req.files?.image) {
//       // Delete the old image file if it exists
//       if (imagePath) {
//         const oldImagePath = path.resolve(`.${imagePath}`);
//         if (fs.existsSync(oldImagePath)) {
//           fs.unlinkSync(oldImagePath);
//         }
//       }

//       // Save the new image file
//       let rootPath = path.resolve();
//       let uniqueTimestamp = Date.now() + Math.floor(Math.random() * 1000);
//       imagePath = path
//         .join("/", "uploads", `${uniqueTimestamp}-${req.files.image.name}`)
//         .replaceAll("\\", "/");
//       req.files.image.mv(path.join(rootPath, imagePath));
//     }

//     // Update the product details only if the new values are provided and valid
//     if (name !== undefined) product.name = name;
//     if (category !== undefined) product.category = category;
//     if (price !== undefined && !isNaN(price)) product.price = Number(price);
//     if (description !== undefined) product.description = description;
//     product.image = imagePath;

//     // Save the updated product
//     await product.save();

//     res.send(product);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ message: "Failed to update product" });
//   }
// };

//   const deleteProduct = async (req, res, next) => {
//     try {
//       const productId = req.params._id;
//       const product = await Product.findById(productId);
  
//       if (!product) {
//         return res.status(404).send(`Product with ID ${productId} not found`);
//       }
  
//       await Product.findByIdAndDelete(productId);
//       if (product.image) {
//         fs.unlink(path.join(path.resolve(), product.image), (err) => {
//           if (err) {
//             console.error(err);
//           }
//         });
//       }
//       res.send("Product deleted");
//     } catch (error) {
//       next(error);
//     }
//   };


// module.exports = {
//     fetchProducts,
//     storeProduct,
//     updateProduct,
//     deleteProduct,
//   };

const Product = require("../model/Product");
const { uploadOnCloudinary } = require("../utils/cloudinary");

exports.fetchProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

exports.storeProduct = async (req, res) => {
  try {
    const { name, category, price, description } = req.body;
    const imageFile = req.files?.image?.[0]?.path;

    if (!imageFile) return res.status(400).json({ message: "Image is required" });

    const cloudUpload = await uploadOnCloudinary(imageFile);
    if (!cloudUpload) return res.status(500).json({ message: "Image upload failed" });

    const product = await Product.create({
      name,
      category,
      price,
      description,
      image: cloudUpload.secure_url,
    });

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.error("Store product error:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, category, price, description } = req.body;

    const product = await Product.findById(_id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.files?.image?.[0]?.path) {
      const cloudUpload = await uploadOnCloudinary(req.files.image[0].path);
      if (cloudUpload) {
        product.image = cloudUpload.secure_url;
      }
    }

    product.name = name ?? product.name;
    product.category = category ?? product.category;
    product.price = price ?? product.price;
    product.description = description ?? product.description;

    await product.save();

    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { _id } = req.params;
    const product = await Product.findByIdAndDelete(_id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Note: image not deleted from Cloudinary (no public_id saved)
    res.status(200).json({ message: "Product deleted", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};
