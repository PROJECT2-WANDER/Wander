const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema({  
  user : {
    type : Schema.Types.ObjectId,
    ref: 'User'
  }, 
    name: String, 
    address: String, 
    category: String, 
    coordinates:[Number],
    description: String, 
    rating: Number,
    tag: String
    // tag : [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Tag'
    //   }
    // ]
    });
    
const Place = mongoose.model("Place", placeSchema);
module.exports = Place;