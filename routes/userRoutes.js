import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.user) return res.redirect('/jobs');
  res.render('landing', { title: 'Easily - Find Your Dream Job' });
});

router.get('/register', UserController.getRegister);
router.post('/register', UserController.postRegister);
router.get('/login', UserController.getLogin);
router.post('/login', UserController.postLogin);
router.post('/logout', UserController.postLogout);

export default router;
