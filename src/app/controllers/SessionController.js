import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import authConfig from '../../config/authConfig';

dotenv.config();

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      apiKey: Yup.string()
        .required()
        .min(128),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { apiKey } = req.body;

    if (!(apiKey === process.env.HASH_KEY)) {
      return res.status(401).json({ error: 'unauthorized access' });
    }

    return res.json({
      token: jwt.sign({ apiKey }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
