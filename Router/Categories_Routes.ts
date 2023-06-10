
import { Router } from 'express';
import express, { Request, Response } from 'express';
import  {Category, CategoryInterface, categoryValidationSchema } from '../DB_Models/Categories';
import Joi from 'joi';
import { checkAuth } from '../Middlewares/checkAuth';

export const categoryRouter = Router();

categoryRouter.post('/save',checkAuth ,async (req: Request, res: Response) => {
    try {
        const { error, value } = categoryValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const category = new Category(value)
        await category.save(req.body);
        res.status(200).json(category);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
});

categoryRouter.get('/get',checkAuth ,async (req: Request, res: Response) => {
    try {
        const categories: CategoryInterface[] = await Category.find();
        res.json(categories);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
});


categoryRouter.get('/getbyid/:id',checkAuth ,async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category: CategoryInterface | null = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
});


categoryRouter.patch('/update/:id', checkAuth, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { error, value } = categoryValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const category: CategoryInterface | null = await Category.findByIdAndUpdate(
            id,
            value,
            { new: true }
        );
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
});

categoryRouter.delete('/delete/:id',checkAuth ,async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category: CategoryInterface | null = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
});

