import jwt from 'jsonwebtoken';

import constant from '../constant/';
import roles from '../helpers/roles';

const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    role: roles.admin
  },
  {
    id: 2,
    username: 'user',
    password: 'user',
    firstName: 'Normal',
    lastName: 'User',
    role: roles.user
  }
];

export async function authenticate({ username, password }) {
  const user = users.find(
    u => u.username === username && u.password === password
  );
  if (user) {
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      token
    };
  }
}

export async function getAll() {
  return users.map(u => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
}

export async function getById(id) {
  const user = users.find(u => u.id === parseInt(id));
  if (!user) return;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
