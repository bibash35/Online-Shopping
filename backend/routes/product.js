const {
    storeProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
    }=require("../controller/product")
const express = require("express");
const { isSeller, checkAuthentication } = require("../middelware/ticket");



  

const router = express.Router();
router.get("",fetchProducts)
router.post("",checkAuthentication,isSeller,storeProduct)
router.put("/:_id",checkAuthentication,isSeller,updateProduct)
router.delete("/:_id",checkAuthentication,isSeller,deleteProduct)


module.exports = router;