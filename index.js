const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'secret-dance-session',
  resave: false,
  saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('mustache', mustacheExpress(path.join(__dirname, 'views/partials'), '.mustache'));
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());

const mainRoutes = require('./routes/mainRoutes');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const classRoutes = require('./routes/classRoutes');
const organiserRoutes = require('./routes/organiserRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/', mainRoutes);
app.use('/', authRoutes);
app.use('/', courseRoutes);
app.use('/', classRoutes);
app.use('/', organiserRoutes);
app.use('/', bookingRoutes);
app.use('/', courseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
