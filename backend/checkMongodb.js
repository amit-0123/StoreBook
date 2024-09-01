
    //  this is the file only to check if the mongodb driver is installed or not
    
    // this is not the part of this backend i have made it to check for mongodb driver

                  
try{
require('mongodb');
console.log("mongodb is installed successfully");
}catch(e){
    console.log('MongoDB driver is not installed.');
}

// to check type the command " node checkMongodb.js" int he terminal
// if present you will get "mongodb is installed successfully".