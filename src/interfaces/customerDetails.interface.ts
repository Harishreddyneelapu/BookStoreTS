import { Document, Types } from 'mongoose';


export interface IAddress {
  type: 'home' | 'office' | 'other';
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}


export interface ICustomerDetails extends Document {
  customerId: Types.ObjectId; 
  fullName: string;
  mobileNumber: string;
  address: IAddress[];
}
