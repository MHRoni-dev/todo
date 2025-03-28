import { config } from '@/config';
import JWT, { JwtPayload as JWTJwtPayload } from 'jsonwebtoken';
import { Schema } from 'mongoose';


export interface JwtPayload extends JWTJwtPayload {
  _id : Schema.Types.ObjectId;
  username: string;
}


export default class Token {
  static sign = (payload: JwtPayload): string => {
    return JWT.sign(payload, config.default.JWT.JWT_SECRET, { expiresIn: config.default.JWT.JWT_EXPIRES_IN });
  }

  static verify = (token: string): JwtPayload => {
   try {
    const decoded = JWT.verify(token, config.default.JWT.JWT_SECRET);
    if(typeof decoded === 'string') {
      throw new Error('Invalid token');
    }


    return decoded as JwtPayload;

   } catch {
    throw new Error('Invalid  token');
   }
  }
}