import { Document, Schema, model } from 'mongoose';


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

export default model('User', userSchema);
