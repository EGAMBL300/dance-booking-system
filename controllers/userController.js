const userModel = require('../models/userModel');

exports.showOrganisers = (req, res) => {
  const user = req.session.user || { role: 'guest' };
  const currentUserId = user._id;
  const isOrganiser = user.role === 'organiser';

  userModel.getAllOrganisers((err, organisers) => {
    if (err) return res.send("Error loading organisers");

    const organiserList = organisers.map(org => ({
      ...org,
      isCurrentUser: currentUserId && org._id.toString() === currentUserId.toString()
    }));
    

    res.render('pages/manage-organisers', {
      organisers: organiserList,
      user,
      isOrganiser
    });
  });
};



exports.deleteOrganiser = (req, res) => {
  const organiserId = req.params.id;
  const currentUserId = req.session.user._id;

  if (!req.session.user || !req.session.user._id) {
    return res.status(401).send("Unauthorized");
  }  

  if (organiserId.toString() === currentUserId.toString()) {
    return res.status(403).send("You cannot delete yourself.");
  }

  userModel.deleteUser(organiserId, (err) => {
    if (err) return res.send("Failed to delete organiser.");
    res.redirect('/dashboard/manage-organisers');
  });
};

