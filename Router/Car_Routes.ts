import { Router, Request, Response } from 'express';
import { Car, CarInterface, carValidationSchema } from '../DB_Models/Car';
import { checkAuth } from '../Middlewares/checkAuth';
import { ValidationResult } from 'joi';

export const carRouter = Router();

// Add a car to the database
carRouter.post('/register', checkAuth, async (req: Request, res: Response) => {
  console.log('gggg')
  try {
    const { error, value }: ValidationResult<CarInterface> = carValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { registrationNumber } = value;
    const preuser = await Car.findOne({ registrationNumber });

    if (preuser) {
      return res
        .status(400)
        .json({ message: 'Car for this Registration Number already exists.' });
    }

    const addCar = new Car(value);
    await addCar.save();
    res.status(200).json(addCar);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all cars data
carRouter.get('/', checkAuth ,async (req: Request, res: Response) => {
  try {
    const carsData = await Car.find();
    res.status(200).json(carsData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get individual car
carRouter.get('/getCar/:id', checkAuth ,async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);
    res.status(200).json(car);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update car data
carRouter.patch('/updateCar/:id', checkAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error, value }: ValidationResult<CarInterface> = carValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      id,
      value,
      {
        new: true,
      }
    );

    res.status(200).json(updatedCar);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete car
carRouter.delete('/deleteCar/:id', checkAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteCar = await Car.findByIdAndDelete(id);
    res.status(200).json(deleteCar);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
