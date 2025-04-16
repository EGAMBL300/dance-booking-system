exports.requireLogin = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/');
    }
    next();
  };
  
  exports.requireOrganiser = (req, res, next) => {
    if (req.session.user?.role !== 'organiser') {
      return res.status(403).send('Access denied');
    }
    next();
  };
  