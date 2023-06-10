"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRouter = void 0;
const express_1 = require("express");
const Car_1 = require("../DB_Models/Car");
const checkAuth_1 = require("../Middlewares/checkAuth");
exports.carRouter = (0, express_1.Router)();
// Add a car to the database
exports.carRouter.post('/register', checkAuth_1.checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('gggg');
    try {
        const { error, value } = Car_1.carValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { registrationNumber } = value;
        const preuser = yield Car_1.Car.findOne({ registrationNumber });
        if (preuser) {
            return res
                .status(400)
                .json({ message: 'Car for this Registration Number already exists.' });
        }
        const addCar = new Car_1.Car(value);
        yield addCar.save();
        res.status(200).json(addCar);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));
// Get all cars data
exports.carRouter.get('/', checkAuth_1.checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carsData = yield Car_1.Car.find();
        res.status(200).json(carsData);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));
// Get individual car
exports.carRouter.get('/getCar/:id', checkAuth_1.checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const car = yield Car_1.Car.findById(id);
        res.status(200).json(car);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));
// Update car data
exports.carRouter.patch('/updateCar/:id', checkAuth_1.checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { error, value } = Car_1.carValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const updatedCar = yield Car_1.Car.findByIdAndUpdate(id, value, {
            new: true,
        });
        res.status(200).json(updatedCar);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));
// Delete car
exports.carRouter.delete('/deleteCar/:id', checkAuth_1.checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteCar = yield Car_1.Car.findByIdAndDelete(id);
        res.status(200).json(deleteCar);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));
