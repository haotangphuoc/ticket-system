import mongoose, { Schema, Document } from 'mongoose';

export type UserRole = "CLIENT" | "ADMINISTRATOR";

export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  organizationId: mongoose.Types.ObjectId;
  ticketIds: mongoose.Types.ObjectId[];
  role: UserRole;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  ticketIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
  role: { type: String, enum: ["CLIENT", "ADMINISTRATOR"], required: true }
});

export const User = mongoose.model<IUser>('User', userSchema);
