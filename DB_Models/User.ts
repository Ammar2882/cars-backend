import { Schema, model} from 'mongoose'
import Joi from 'joi';

export interface UserInterface { 
	_id?:string
    firstName: string 
	lastName: string
	email: string
	password: string
	role:string
}
const userSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	role: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

export const User = model<UserInterface>('User', userSchema);

export const validate = (data:UserInterface) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		role: Joi.string().required().label("Role"),
		email: Joi.string().email().required().label("Email"),
	});
	return schema.validate(data);
};

