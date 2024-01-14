import { model, Schema, Document } from 'mongoose';
import { USER_TYPE, User } from '@interfaces/users.interface';

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(USER_TYPE),
    default: USER_TYPE.USER
  }
});

export const UserModel = model<User & Document>('User', UserSchema);
