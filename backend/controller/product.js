const Product = require("../model/Product");
const path = require("path");
const fs = require("fs");

const fetchProducts = async (req, res) => {

  let product=await Product.find();
res.send(product)

 
}
const storeProduct = async (req, res) => {
   
    
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
    const { _id } = req.params;
    const { name, category, price, description } = req.body;

    const product = await Product.findById(_id);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    let imagePath = product.image;

    if (req.files?.image) {
      // Delete the old image file if it exists
      if (imagePath) {
        const oldImagePath = path.resolve(`.${imagePath}`);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Save the new image file
      let rootPath = path.resolve();
      let uniqueTimestamp = Date.now() + Math.floor(Math.random() * 1000);
      imagePath = path
        .join("/", "uploads", `${uniqueTimestamp}-${req.files.image.name}`)
        .replaceAll("\\", "/");
      req.files.image.mv(path.join(rootPath, imagePath));
    }

    // Update the product details only if the new values are provided and valid
    if (name !== undefined) product.name = name;
    if (category !== undefined) product.category = category;
    if (price !== undefined && !isNaN(price)) product.price = Number(price);
    if (description !== undefined) product.description = description;
    product.image = imagePath;

    // Save the updated product
    await product.save();

    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Failed to update product" });
  }
};

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


module.exports = {
    fetchProducts,
    storeProduct,
    updateProduct,
    deleteProduct,
  };

