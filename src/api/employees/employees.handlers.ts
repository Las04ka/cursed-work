import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { object } from 'zod';
import * as z from 'zod';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { User, Users } from '../users/users.model';
import { Employee, Employees, EmployeesModel } from './employees.model';

export async function getEmployees(req: Request, res: Response, next: NextFunction) {
    try {
        res.json(await Employees.find().toArray());
    } catch (error) {
        next(error);
    }
}

export async function addEmployee(req: Request<{}, {}, Employee>, res: Response, next: NextFunction) {
    try {
        const employee = EmployeesModel.parse(req.body);

        const insertResult = await Employees.insertOne(employee);
        if (!insertResult) {
            next('Error inserting employee.');
            return;
        }

        res.status(200).json({
            message: 'created Successfully',
        });
    } catch (error) {
        next(error);
    }
}


export async function deleteEmployee(req: Request<ParamsWithId, {}, {}>, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const existingEmployee = await Employees.findOne({ _id: new ObjectId(id) });

        if (!existingEmployee) {
            return res.status(400).json({ message: 'Employee does not exist' });
        }

        const deleteResult = await Employees.deleteOne({ _id: new ObjectId(id) });

        if (!deleteResult.acknowledged) {
            next('Error deleting employee.');
            return;
        }

        res.status(200).json({
            message: 'Employee deleted successfully',
        });
    } catch (error) {
        next(error);
    }
}

export async function editEmployee(req: Request<ParamsWithId, {}, Employee>, res: Response, next: NextFunction) {
    try {
        const employee = req.body;
        const { id } = req.params
        const existingEmployee = await Employees.findOne({ _id: new ObjectId(id) });

        if (!existingEmployee) {
            return res.status(400).json({ message: 'Employee does not exist' });
        }

        const editResult = await Employees.updateOne({ _id: new ObjectId(id) }, {$set:employee});

        if (!editResult.acknowledged) {
            next('Error editing employee.');
            return;
        }

        res.status(200).json({
            message: 'Employee edited successfully',
        });
    } catch (error) {
        next(error);
    }
}


