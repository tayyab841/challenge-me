import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from 'express';

import User from '../models/user';
import { getToken } from '../utilities/getToken';
import { JsonWebTokenError } from 'jsonwebtoken';

// temp actions
export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await User.find({}).exec();
        res.status(200).json({ users: users });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

// user actions
export async function userSignup(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;

    if (!name) return res.status(400).json('Name cannot be empty!');
    if (!email) return res.status(400).json('Email cannot be empty!');
    if (!password) return res.status(400).json('Password cannot be empty!');

    // check email format
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) return res.status(400).json("Provide Valid email");

    // check password requirements
    // Minimum eight and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password)) return res.status(400).json("Password not meet the requirements!");

    // Check if email already exists
    const oldUser = await User.find({ email: email }).exec();
    if (oldUser.length) { return res.status(400).json("User Already Exist!") }

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ name: name, email: email, password: encryptedPassword });
        const token = getToken(user._id + '');
        res.cookie('jwt_token', token, { httpOnly: true, maxAge: 1000 * 3600 * 24 });
        res.status(201).json({ data: user, token: token });
    } catch (error) {
        res.status(400).json(error);
    }
}

export async function userLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email) return res.status(400).json('Email cannot be empty!');
    if (!password) return res.status(400).json('Password cannot be empty!');

    const user = await User.findOne({ email: email }).exec();
    if (!user) { return res.status(400).json("User does not exist!") }

    if (await bcrypt.compare(password, user.password)) {
        const token = getToken(user._id + '');
        res.cookie('jwt_token', token, { httpOnly: true, maxAge: 1000 * 3600 * 24 });
        res.status(200).json({ user_name: user.name, token: token });
    } else {
        res.status(401).json("Invalid Credentials!");
    }
}