import { Schema, model} from 'mongoose';
import Joi from 'joi';
// 1. Create an interface representing a document in MongoDB.
export interface CarInterface {
    model: string
    manufacturer: string
	category?:string
    color:string[]
    make: string
    power: string
    registrationNumber: string
    desc: string
}

// 2. Create a Schema corresponding to the document interface.
const carSchema = new Schema({
	model: {
		type: String,
		required: true,
	},
	manufacturer: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required:true
	},
	color: {
		type: Array,
		required: true,
	},
	make: {
		type: String,
		required: true,
	},
	power: {
		type: String,
		required: true,
	},
	registrationNumber: {
		type: String,
		unique: true,
		required: true,
	},
	desc: {
		type: String,
	},
});



// Joi validation schema
export const carValidationSchema = Joi.object<CarInterface>({
	model: Joi.string().required(),
	manufacturer: Joi.string().required(),
	color: Joi.array().required(),
	make: Joi.string().required(),
	category:Joi.string().required(),
	power: Joi.string().required(),
	registrationNumber: Joi.string().required(),
	desc: Joi.string().optional(),
  });


// 3. Create a Model.
export const Car = model<CarInterface>('Car', carSchema);

