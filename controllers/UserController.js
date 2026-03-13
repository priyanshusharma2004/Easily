import UserModel from '../models/UserModel.js';

const UserController = {
  getRegister(req, res) {
    if (req.session.user) return res.redirect('/jobs');
    res.render('auth/register', { title: 'Register', error: null });
  },

  async postRegister(req, res) {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password) {
      return res.render('auth/register', { title: 'Register', error: 'All fields are required.' });
    }
    if (password !== confirmPassword) {
      return res.render('auth/register', { title: 'Register', error: 'Passwords do not match.' });
    }
    const existing = UserModel.getUserByEmail(email);
    if (existing) {
      return res.render('auth/register', { title: 'Register', error: 'Email already registered.' });
    }
    const user = await UserModel.addUser({ name, email, password });
    req.session.user = { id: user.id, name: user.name, email: user.email };
    res.redirect('/jobs');
  },

  getLogin(req, res) {
    if (req.session.user) return res.redirect('/jobs');
    res.render('auth/login', { title: 'Login', error: null });
  },

  async postLogin(req, res) {
    const { email, password } = req.body;
    const user = await UserModel.confirmLogin(email, password);
    if (!user) {
      return res.render('auth/login', { title: 'Login', error: 'Invalid email or password.' });
    }
    req.session.user = { id: user.id, name: user.name, email: user.email };
    res.redirect('/jobs');
  },

  postLogout(req, res) {
    req.session.destroy();
    res.redirect('/');
  }
};

export default UserController;
