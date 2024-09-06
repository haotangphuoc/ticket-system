import mongoose, { Schema, Document } from 'mongoose';
export type UserRole = "CLIENT" | "ADMINISTRATOR";

export interface IUser extends Document {
  name: string;
  passwordHash: string;
  email: string;
  organizationId: mongoose.Types.ObjectId;
  incomingTicketIds?: mongoose.Types.ObjectId[]; // Only for Admins
  role: UserRole;
  outgoingTicketIds: mongoose.Types.ObjectId[]; 
}

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  passwordHash: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  incomingTicketIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
  role: { type: String, enum: ["CLIENT", "ADMINISTRATOR"], required: true },
  outgoingTicketIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true }] 
});

// Make sure 'outgoingTicketIds' is only present for Administrators
userSchema.pre('save', function (next) {
  if (this.role === 'CLIENT') {
    this.incomingTicketIds = undefined;
  }
  next();
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
    delete returnedObject.outgoingTicketIds;
    if(returnedObject.incomingTicketIds) {
      delete returnedObject.incomingTicketIds;
    }
  }
})

export const User = mongoose.model<IUser>('User', userSchema);
