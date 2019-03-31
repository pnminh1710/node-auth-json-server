import express from 'express';

import userService from './user.service';
import authorize from '../helpers/authorize';
import roles from '../helpers/roles';

const router = express.Router();

router.post('/authenticate', authenticate);
router.get('/', authorize(roles.admin), getAll);
router.get('/:id', authorize(), getById);

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res.status(400).json({ message: 'Username or password is incorrect' })
    )
    .catch(err => next(err));
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getById(req, res, next) {
  const currentUser = req.user;
  const id = parseInt(req.params.id);

  // only allow admins to access other user records
  if (id !== currentUser.sub && currentUser.role !== roles.admin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  userService
    .getById(req.params.id)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

export default router;
