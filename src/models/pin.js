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
      required: true,
      max: 50,
    },
    rating : {
        type: Number,
        required: true,
        min: 0,
        max:5
    },
    lat : {
        type:Number,
        required: true,
    },
    lon:{
        type:Number,
        required: true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", pinSchema)