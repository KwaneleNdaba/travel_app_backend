const mongoose = require("mongoose");

const pinSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    
    },

    title: {
      type: String,
      required: true,
      min: 3,
    },

    description: {
      type: String,
      require: true,
      max: 50,
    },
    rating : {
        type: Number,
        require: true,
        min: 0,
        max:5
    },
    lat : {
        type:Number,
        require: true,
    },
    lon:{
        type:Number,
        require: true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", pinSchema)