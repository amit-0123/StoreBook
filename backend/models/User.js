// A "model" defines a "collection" schema inside a MongoDB database. Create a model.js file and a Mongoose collection schema as follows:

const mongoose = require('mongoose');
// Schema is a Mongoose object used to define the structure of documents within a collection.
const { Schema } = mongoose;

         // or
// const {Schema,model} = require   ("mongoose");


// The UserSchema defines the structure of documents in the user collection.
const UserSchema = new Schema({
      name:{
         type:String,
         required:true,
         maxlength: 50
      },
      email:{
        type:String,
        required:true,
        unique:true
      },
      password:{
        type:String,
        required:true
      },
      date:{
       type:Date,
       default : Date.now
      },
});


// creates a model called User. This model represents the user collection in the MongoDB database and allows you to interact with it (e.g., creating, reading, updating, and deleting documents).
const User = mongoose.model('user',UserSchema);

// User.createIndexes();

// This line exports the User model so it can be used in other parts of the application. For example, you might import it in your controller or route files to perform operations on the user collection.
module.exports = User