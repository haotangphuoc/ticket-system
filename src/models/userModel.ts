import mongoose, { Schema, Document } from 'mongoose';

export type UserRole = "CLIENT" | "ADMINISTRATOR";

export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  organizationId: mongoose.Types.ObjectId;
  incomingTicketIds?: mongoose.Types.ObjectId[]; // Only for Admins
  role: UserRole;
  outgoingTicketIds: mongoose.Types.ObjectId[]; 
}

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  incomingTicketIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
  role: { type: String, enum: ["CLIENT", "ADMINISTRATOR"], required: true },
  outgoingTicketIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true }] 
});

// Make sure 'outgoingTicketIds' is only present for Administrators
UserSchema.pre('save', function (next) {
  if (this.role === 'CLIENT') {
    this.incomingTicketIds = undefined;
  }
  next();
});

export const User = mongoose.model<IUser>('User', UserSchema);
