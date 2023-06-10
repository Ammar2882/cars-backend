import { User, UserInterface } from "../DB_Models/User";
import { Router } from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Joi from 'joi'
export const authRouter = Router();
const maxAge = 6 * 60 * 60;
const createToken = (id:any) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: maxAge,
    });
};

authRouter.post('/', async (req:any, res:any) => {
    try {
        console.log('got hit')
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ message: 'Invalid Email or Password' });

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(401).send({ message: 'Invalid Email or Password' });

        const token = createToken(user._id);
        // res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true });

        res.status(200).send({ message: 'logged in successfully', data:{token,role:user.role}});
    } catch (error) {
        console.log(error)
    }
});

const validate = (data: UserInterface) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password'),
    });
    return schema.validate(data);
};


