import mongoose, { Schema, Document } from 'mongoose';

export interface IOrganization extends Document {
  name: string;
  userIds: mongoose.Types.ObjectId[];
}

const organizationSchema: Schema = new Schema({
  name: { type: String, required: true },
  userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

organizationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.userIds;
  }
})

export const Organization = mongoose.model<IOrganization>('Organization', organizationSchema);
