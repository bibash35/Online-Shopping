const mongoose=require("mongoose");
const { BUYER, SELLER } = require("../constant/role");

const{Schema}=mongoose;

const UserSchema=new Schema({
    firstName: String,
  lastName: String,
  email: {
    // unique:true,
    type: String,
    /* custom mongoose validation  -- check email here.. */
    validate: {
      validator: async (value) => {
        let matched = await mongoose.models.User.findOne({ email: value });
        if (matched) {
          return false;
        }
      },
      message: "email already used",
    },
  },
    password:{
        required:true,
        type:String,
    },
    // role: {
    //     type: String,
    //     enum: [BUYER, SELLER],
    //     required: true,
    // },
    image: {
      type: String,
    },
},
{
  timestamps: true,
}
)


const User = mongoose.model('User', UserSchema);
module.exports=User;

