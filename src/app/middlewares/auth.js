import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/authConfig';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    await promisify(jwt.verify)(token, authConfig.secret);
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'token invalid' });
  }
};
