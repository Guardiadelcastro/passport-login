const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

// userSchema.methods.encryptPassword = (password) => {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// };

// userSchema.methods.comparePassword = (password) => {
//   return bcrypt.compareSync(password, this.password);
// };

// userSchema.methods.comparePassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

module.exports = User;