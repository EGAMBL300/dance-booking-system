const express = require('express');
const router = express.Router();
const courseModel = require('../models/courseModel');
const classModel = require('../models/classModel');
const organiserController = require('../controllers/organiserController');
const courseController = require('../controllers/courseController');
const { requireLogin, requireOrganiser } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/dashboard/courses/:id/edit', requireLogin, requireOrganiser, organiserController.showEditCourse);
router.post(
  '/dashboard/courses/:id/edit',
  requireLogin,
  requireOrganiser,
  upload.single('courseImage'),
  organiserController.updateCourse
);

router.get('/courses/:id', (req, res) => {
  const courseId = req.params.id;
  const bookingStatus = req.query.booking;
  
  const user = req.session.user || { role: 'guest' };
  const isOrganiser = user.role === 'organiser';

  courseModel.getCourseById(courseId, (err, course) => {
    if (err) {
      console.error("Error fetching course:", err);
      return res.status(500).send("Internal error while fetching course.");
    }
    if (!course) {
      console.log("Course not found");
      return res.status(404).send("Course not found");
    }

    classModel.getClassesByCourse(courseId, (err, classes) => {
      if (err) {
        console.error("Error fetching classes:", err);
        return res.status(500).send("Error fetching class data.");
      }

      classes.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      res.render('pages/course-details', {
        course,
        classes,
        user,
        isOrganiser,
        bookingStatus,
        isBookingSuccess: bookingStatus === 'success',
        isBookingExists: bookingStatus === 'exists',
        isBookingError: bookingStatus === 'error'
      });
    });
  });
});

router.post('/courses/:courseId/enrol', courseController.enrolInCourse);

router.get('/courses', courseController.showCourses);

module.exports = router;