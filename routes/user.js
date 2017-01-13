
/*
* GET users listing.
*/

/*exports.list = function(req, res){
res.send("respond with a resource");
};*/


// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

  teacher            : {
    username     : String,
    password     : String,
    jsondata     : String,
  },
  codeJson            : {
    idss     : String,
    jsondata     : String,
  },
  savePicture            : {
    idpic     : String,
    jsondata     : String,
  },
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.teacher.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
