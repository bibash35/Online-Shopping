const {fetchProducts,
    storeProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts}=require("../controller/product")
const express = require("express");



  

const router = express.Router();
router.get("",fetchProducts)
// router.post("",checkAuthentication,isSeller,storeProduct)
router.post("",storeProduct)
// router.put("/:_id",checkAuthentication,updateProduct)
router.delete("/:_id",deleteProduct)
router.delete("",deleteAllProducts)

module.exports = router;