const jwt = require("jsonwebtoken");
const { SELLER, BUYER } = require("../constant/role");


function checkAuthentication(req, res,next) {
  //?. vaneko optional chaining
  // const token = req.headers.authorization.split(" ")[1]
    let token = req.headers.authorization?.replaceAll("Bearer ", "");
    if (token) {
        try {

 //yo decodedUser ma login gareko user ko info aaayo
 //kinaki hamle login bata token generate gareko ho basiclly use ko info decodedUser ma aayo           

  //  const decodedUser = jwt.verify(token, "bibash");
   const decodedUser = jwt.verify(token, process.env.JWT_SECRET,{expiresIn:"1y"});
    //ani tyo info req.user ma set garyo
    //ani set up vayesi product create garne bela createdBy: req.user._id
    //basically login vayesi user ko info req.user ma janey vo
          req.user = decodedUser;
          return next();
        } catch (err) {
          /*  if there is error in jwt token from client..
              let leave it as it is and our below code will handle.
          */
        }
      }
    
      return res.status(401).send({
        msg: "unauthenticated",
      });
}

const isSeller = (req, res, next) => {
  if (req.user.role === SELLER) {
    return next();
  }
  res.status(403).send({
    msg: "only for seller",
  });
};

// const isBuyer = (req, res, next) => {
//   if (req.user.role === BUYER) {
//     return next();
//   }
//   res.status(403).send({
//     msg: "only for buyer",
//   });
// };


module.exports = {
  checkAuthentication,
  isSeller,
  // isBuyer,
};