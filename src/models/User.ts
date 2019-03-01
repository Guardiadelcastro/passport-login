import { Document, Schema, model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export interface UserModel extends Document {
  name: string,
  email: string,
  password: string,
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
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

userSchema.pre('save', function hashPassword(next) {
  const user = this as UserModel;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
     return next()
  };

  // generate a salt
  return bcrypt.genSalt(10).then((salt) => {
    // hash the password along with our new salt
    return bcrypt.hash(user.password, salt).then((hash) => {
      // override the cleartext password with the hashed one
      user.password = hash;
      return next();
    }).catch(next);
  }).catch(next);
});

export default model('User', userSchema);
