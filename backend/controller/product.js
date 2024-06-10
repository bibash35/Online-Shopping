const Product = require("../model/Product");
const path = require("path");
const fs = require("fs");

const fetchProducts = async (req, res) => {
let product=await Product.find();
res.send(product)
}
const storeProduct = async (req, res) => {
   
    // let rootPath = path.resolve();
    // let storagePath=path.join(rootPath,"uploads")
    // req.files.image.mv(path.join(storagePath,req.files.image.name ));
    try {
      let imagePath = null;
  
      if (req.files?.image) {
        let rootPath = path.resolve();
        let uniqueTimestap = Date.now() + Math.floor(Math.random() * 1000);
  
        imagePath = path
          .join("/", "uploads", `${uniqueTimestap}-${req.files.image.name}`)
          .replaceAll("\\", "/");
        req.files.image.mv(path.join(rootPath, imagePath));
      }

let product=await Product.create({
    ...req.body,
    image: imagePath,
  });
res.send(product)
}catch(err){
    console.log(err)

}
}
const updateProduct = async (req, res) => {
    try {
      const productId = req.params._id; // Extract the product ID from request parameters
      const updateData = req.body; // Data to update the product
      const product = await Product.findById(productId);

       if (!product) {
        return res.status(404).send(`Product with ID ${productId} not found`);
      } 
      await Product.findByIdAndUpdate(productId, updateData);
      res.send(`Product with ID ${productId} updated`); // Send a success message
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
  const deleteProduct = async (req, res, next) => {
    try {
      const productId = req.params._id;
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).send(`Product with ID ${productId} not found`);
      }
  
      await Product.findByIdAndDelete(productId);
      if (product.image) {
        fs.unlink(path.join(path.resolve(), product.image), (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      res.send("Product deleted");
    } catch (error) {
      next(error);
    }
  };
  const deleteAllProducts = async (req, res, next) => {
    try {
      // Fetch all products
      const products = await Product.find({});
  
      // Loop through products to delete their associated images
      products.forEach(async (product) => {
        if (product.image) {
          fs.unlink(path.join(path.resolve(), product.image), (err) => {
            if (err) {
              console.error(err);
            }
          });
        }
      });
  
      // Delete all products from the database
      await Product.deleteMany({});
  
      res.send("All products deleted");
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
    fetchProducts,
    storeProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts
  };
  
  
module.exports = {
    fetchProducts,
    storeProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
  };