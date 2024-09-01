// importing of the mongoose library
const mongoose = require('mongoose');
// iNotebook is a name of the database in the locally installed mongodb
const mongoURI = "mongodb://localhost:27017/iNotebook?directConnection=true";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// export the function
module.exports = connectToMongo;


// for connecting to the mongodb database run the command "npx nodemon ./index.js" there is npx because i have installed nodemon locally rather than globaly.

// if it is installed globalu than we write only "nodemon ./index.js" to run or to start the server

// index is file i can give the name to that file server.js also



