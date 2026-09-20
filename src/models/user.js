const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
  firstName: {
    type: String,
    required : true,
    minLength: 4,
    lowerCase :true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true

  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    min:18,
    max:60
  },
  gender: {
    type: String,
    validate: function(value){
      if(!['male','female', "others"].includes(value.toLowerCase())){
        throw new Error("Invalid gender")
      }
    }
  },
  photoUrl:{
    type:String,
    default:'https://static.vecteezy.com/system/resources/previews/045/711/185/non_2x/male-profile-picture-placeholder-for-social-media-forum-dating-site-chat-operator-design-social-profile-template-default-avatar-icon-flat-style-free-vector.jpg'
  },
  about:{
    type:String,
    default : 'This is a default value of user'
  },
  skills:{
    type: [String],
    required : true,
    default: undefined,
    enum : ["html", "javascript", "react","vue","animator", "desinger", "electrician", "gamer", "Coder","bim" ],
  }
  
},
{
    timestamps:true
  }
);


const User = mongoose.model("User", userSchema)

module.exports = User;