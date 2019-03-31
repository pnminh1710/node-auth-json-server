import expressJwt from 'express-jwt';
import { SECRET } from '../constant';

export default function authorize(roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return [
    expressJwt({ secret: SECRET }),
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      next();
    }
  ];
}
