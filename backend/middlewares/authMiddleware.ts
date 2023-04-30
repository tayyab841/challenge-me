import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import User from "../models/player";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const { token: bodyToken } = req.body;
  const { token: queryToken } = req.query;
  const token = bodyToken || queryToken;

  if (!token)
    return res.status(403).json("A token is required for authentication");

  try {
    let decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    if (typeof (decodedToken) === "object") {
      const userId = decodedToken.userId;
      const user = await User.findById(userId).exec();
      if (user) {
        res.locals.signedInUser = user;
        return next();
      }
    }
    throw new Error();
  } catch (err) {
    return res.status(401).json("Invalid Token");
  }
};

export default verifyToken;