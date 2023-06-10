import { Router } from 'express';
import { User, validate } from '../DB_Models/User';
import bcrypt from 'bcrypt';
import { sendEmail } from '../utils/Send_Emails';
export const userRouter = Router();

userRouter.post('/', async (req, res) => {
	try {
    
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: 'User with given email already Exist!' });

		const password = Math.random() // Generate random number, eg: 0.123456
			.toString(36) // Convert  to base-36 : "0.4fzyo82mvyr"
			.slice(-8);

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		user = await new User({ ...req.body, password: hashPassword,role:req.body.role.toLowerCase() }).save();
		console.log(password)

		await sendEmail(user.email, user.lastName,`Your password: ${password}`);

		res.status(201).send({ message: 'Password Sent to Mail' });
	} catch (error) {
		console.log(error)
	}
});

