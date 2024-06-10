const User = require("../model/User");
const bcrypt = require("bcrypt");
const path = require("path");

// const Joi = require("joi");

// 
// const signupValidationSchema = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   email: Joi.string().email().required(),
//   password: Joi.string()
//     .min(8)
//     .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
//     .required(),
//   role: Joi.string().valid("buyer", "seller").required(),
// });
const signup = async (req, res, next) => {
  
  
// // try {
// //   const value = await signupValidationSchema.validateAsync(req.body,{
// //     allowUnknown: true,
// //           abortEarly: false,
// //   });
// // }
// // catch (err) {
// //   // return res.send(err)
// //   return res.status(400).send({
// //     msg: "validation error",
// //     errors: err.details.map((el) => {
// //       return {
// //         field: el.context.key,
// //         msg: el.message,
// //       };
// //     }),
// //   });
// //  }

    try {
      
    //   if (!req.body.firstName || !req.body.lastName ||!req.body.email ||!req.body.password ) {
    //     return res.status(400).json({ error: 'firstName,lastName,Email, password,  are required' });
    // }
      // Check if the email is already registered
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
          return res.status(400).json({ error: 'Email already in use' });
      }

      // Hash the password
      let hashed = await bcrypt.hash(req.body.password, 10);

      // Create the user
      let user = await User.create({ ...req.body, password: hashed });
//ya ...req.body ma sab field aako xa tara password:hashed garepaxi password field
//chahi change vayera hashed vayo
      res.send(user);
  } catch (err) {
      next(err);
  }
    
  };

 
  

  const login = async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email }); // null
      if (user) {
        let matched = await bcrypt.compare(req.body.password, user.password);
  
        if (matched) {
          // Handle image upload
          let imagePath = null;
  
          if (req.files?.image) {
            let rootPath = path.resolve();
            let uniqueTimestamp = Date.now() + Math.floor(Math.random() * 1000);
  
            imagePath = path
              .join("/", "uploads", `${uniqueTimestamp}-${req.files.image.name}`)
              .replaceAll("\\", "/");
            req.files.image.mv(path.join(rootPath, imagePath));
            
            // Update user with image path
            user.imagePath  = imagePath; // Assuming imagePath is a field in your user schema
            // await user.save();
            await User.create({
              ...req.body,
              image: imagePath,
            });
          }
          
          return res.send(user);
          // return res.send({ user, imagePath });
        }
      }
  
      // If credentials don't match
      res.status(401).send({
        msg: "Invalid credentials",
      });
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).send({
        msg: "An error occurred while processing your request",
      });
    }
  };
  
  const logout = (req, res) => {
    // For logging out, you just need to clear the token from the client-side
    res.clearCookie('token'); // If using cookies
    // Or, if using local storage
    // localStorage.removeItem('token');
    res.status(200).send({ message: 'Logged out successfully' });
  };
  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select("-password"); // Exclude passwords from the result
  
      res.send(users);
    } catch (err) {
      console.log(err);
    }
  };
  module.exports = {
    signup,
    login,
    logout,
    getAllUsers,
  };