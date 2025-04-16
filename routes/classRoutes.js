const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { requireLogin, requireOrganiser } = require('../middleware/auth');
const bookingModel = require('../models/bookingModel');

router.get('/dashboard/courses/:courseId/classes/add', requireLogin, requireOrganiser, classController.showAddClass);
router.post('/dashboard/courses/:courseId/classes/add', requireLogin, requireOrganiser, classController.addClass);
router.get('/dashboard/classes/:classId/delete', requireLogin, requireOrganiser, classController.deleteClass);
router.get('/classes/:classId/attendees/json', requireLogin, requireOrganiser, (req, res) => {
  const classId = req.params.classId;
  bookingModel.getBookingsByClass(classId, (err, bookings) => {
    if (err) return res.status(500).json({ error: 'Failed to load attendees' });
    res.json({ bookings });
  });
});

router.get('/dashboard/classes/:classId/edit', requireLogin, requireOrganiser, classController.showEditClass);
router.post('/dashboard/classes/:classId/edit', requireLogin, requireOrganiser, classController.updateClass);

router.post('/classes/:classId/attendees/remove', requireLogin, requireOrganiser, (req, res) => {
  const { classId } = req.params;
  const { email } = req.body;

  bookingModel.removeBooking(classId, email, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to remove attendee' });
    res.json({ success: true });
  });
});

module.exports = router;
