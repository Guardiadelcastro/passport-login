import { Document, Schema, model } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface IUserModel extends Document {
  name: string,
  email: string,
  password: string,
}

const UserSchema = new Schema({
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

UserSchema.pre('save', async function hashPassword(next) {
  try {
    const user = this as IUserModel

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

export default model('User', UserSchema);
