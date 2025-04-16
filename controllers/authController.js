const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  const { username, password } = req.body;

  userModel.findUser(username, (err, user) => {
    if (err || !user) {
      return req.headers['content-type']?.includes('application/json')
        ? res.status(401).json({ success: false, error: 'Invalid username or password' })
        : res.render('pages/login', { error: 'Invalid username or password' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        req.session.user = { username: user.username, role: user.role };

        return req.headers['content-type']?.includes('application/json')
          ? res.json({ success: true })
          : res.redirect('/dashboard');
      } else {
        return req.headers['content-type']?.includes('application/json')
          ? res.status(401).json({ success: false, error: 'Invalid username or password' })
          : res.render('pages/login', { error: 'Invalid username or password' });
      }
    });
  });
};



exports.register = (req, res) => {
  const { username, password, role } = req.body;

  userModel.createUser(username, password, role, (err) => {
    const isJson = req.headers['content-type']?.includes('application/json');

    if (err) {
      return isJson
        ? res.status(400).json({ success: false, error: 'Registration failed' })
        : res.render('pages/register', { error: 'Registration failed' });
    }

    if (isJson) {
      return res.json({ success: true });
    } else {
      return res.redirect('/');
    }
  });
};



exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/'));
};
