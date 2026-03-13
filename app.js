import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { trackLastVisit } from './middleware/lastVisit.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
  secret: 'easily-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Track last visit via cookie
app.use(trackLastVisit);

// Make session user available in all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.lastVisit = req.cookies.lastVisit || null;
  next();
});

// Routes
app.use('/', userRoutes);
app.use('/jobs', jobRoutes);

// Apply route
import applyRoutes from './routes/applyRoutes.js';
app.use('/apply', applyRoutes);

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: '404 - Page Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
