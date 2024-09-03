import mongoose, { Schema, Document } from 'mongoose';

export interface IOrganization extends Document {
  name: string;
  userIds: mongoose.Types.ObjectId[];
}

const organizationSchema: Schema = new Schema({
  name: { type: String, required: true },
  userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export const Organization = mongoose.model<IOrganization>('Organization', organizationSchema);
