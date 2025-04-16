const express = require('express');
const router = express.Router();
const bookingModel = require('../models/bookingModel');

router.post('/book', (req, res) => {
  const { classId, name, email } = req.body;

  if (!classId || !name || !email) {
    return res.redirect(`/courses/${req.body.courseId}?booking=failed`);
  }

  bookingModel.findBooking(classId, email, (err, existing) => {
    if (existing) {
      return res.redirect(`/courses/${req.body.courseId}?booking=exists`);
    }

    const booking = { classId, name, email };
    bookingModel.createBooking(booking, (err) => {
      if (err) return res.redirect(`/courses/${req.body.courseId}?booking=error`);
      res.redirect(`/courses/${req.body.courseId}?booking=success`);
    });
  });
});


module.exports = router;
