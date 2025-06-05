import mongoose, { Schema } from 'mongoose';
import { User, UserDocument } from '../types/user';
import bcrypt from 'bcryptjs';

const GeoSchema = new Schema({
  lat: { type: String, required: true },
  lng: { type: String, required: true }
});

const AddressSchema = new Schema({
  street: { type: String, required: true },
  suite: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: String, required: true },
  geo: { type: GeoSchema, required: true }
});

const CompanySchema = new Schema({
  name: { type: String, required: true },
  catchPhrase: { type: String, required: true },
  bs: { type: String, required: true }
});

const UserSchema = new Schema<UserDocument>({
  userId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  address: { type: AddressSchema, required: true },
  phone: { type: String, required: true },
  website: { type: String, required: true },
  company: { type: CompanySchema, required: true },
  password: { type: String, required: false }
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare password
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model<UserDocument>('User', UserSchema); 