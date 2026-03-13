import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

let users = [];

const UserModel = {
  getAllUsers() {
    return users;
  },

  getUserById(id) {
    return users.find(u => u.id === id);
  },

  getUserByEmail(email) {
    return users.find(u => u.email === email);
  },

  async addUser({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword
    };
    users.push(user);
    return user;
  },

  async confirmLogin(email, password) {
    const user = this.getUserByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(password, user.password);
    return match ? user : null;
  }
};

export default UserModel;
