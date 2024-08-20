import { Schema, model } from 'mongoose';
import { ICustomerDetails, IAddress } from '../interfaces/customerDetails.interface';

const addressSchema = new Schema<IAddress>({
  type: {
    type: String,
    enum: ['home', 'office', 'other'],
    required: true
  },
  addressLine: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
});

const customerDetailsSchema = new Schema<ICustomerDetails>({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  address: [addressSchema]
});

export default model<ICustomerDetails>('CustomerDetails', customerDetailsSchema);
