// models/Category.ts

import mongoose, { Document, Schema } from 'mongoose';
import Joi from 'joi';

export interface CategoryInterface extends Document {
  name: string;
  description: string;
}

const categorySchema = new Schema<CategoryInterface>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// Joi validation schema
export const categoryValidationSchema = Joi.object<CategoryInterface>({
  name: Joi.string().required(),
  description: Joi.string().required(),
});



export const Category =  mongoose.model<CategoryInterface>('Category', categorySchema);
