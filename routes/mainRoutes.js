const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/dashboard');
});

router.get('/about', (req, res) => {
  const user = req.session.user || { role: 'guest' };
  
  res.render('pages/about', {
    title: "About DanceHub",
    overviewText: "DanceHub is a community-driven dance organisation passionate about movement, connection, and creativity. We provide high-quality dance education and experiences across Scotland, catering to all skill levels and ages.",
    locations: [
      "Glasgow Central Dance Studio - 12 Argyle Street, Glasgow",
      "Edinburgh Dance Collective - 45 Queen Street, Edinburgh",
      "Glasgow West End Movement Hall - 90 Byres Road, Glasgow",
      "Aberdeen Arts & Motion Centre - 18 Belmont Street, Aberdeen",
      "Dundee Rhythm Studio - 27 Reform Street, Dundee"
    ],
    aboutActive: true,
    user,
    isOrganiser: user.role === 'organiser'
  });
});

module.exports = router;
