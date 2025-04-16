const courseModel = require('../models/courseModel');
const classModel = require('../models/classModel');
const bookingModel = require('../models/bookingModel');

exports.showCourses = (req, res) => {
  const user = req.session.user || { role: 'guest' };
  const isOrganiser = user.role === 'organiser';

  courseModel.getAllCourses((err, courses) => {
    if (err) return res.send('Error fetching courses');

    const enhancedCourses = [];

    let processed = 0;
    courses.forEach(course => {
      course.isOrganiser = isOrganiser;
      classModel.getClassesByCourse(course._id, (err, classes) => {
        if (err) {
          course.nextClass = null;
        } else {
          const upcoming = classes
            .map(cls => ({
              ...cls,
              timestamp: new Date(`${cls.date}T${cls.time}`).getTime()
            }))
            .filter(cls => cls.timestamp > Date.now())
            .sort((a, b) => a.timestamp - b.timestamp);
          
          course.nextClass = upcoming[0] || null;
        }
        
        enhancedCourses.push(course);
        processed++;

        if (processed === courses.length) {
          res.render('pages/courses', {
            title: "All Courses",
            courses: enhancedCourses,
            user,
            isOrganiser,
            coursesActive: true
          });
        }
      });
    });
  });
};

exports.enrolInCourse = (req, res) => {
  const { courseId } = req.params;
  const { name, email } = req.body;

  classModel.getClassesByCourse(courseId, (err, classes) => {
    if (err || !classes.length) {
      return res.send('Could not find any classes for this course.');
    }

    const bookings = classes.map(c => ({
      courseId,
      classId: c._id,
      name,
      email
    }));

    bookingModel.insertMany(bookings, (err) => {
      if (err) {
        console.error('Error enrolling in course:', err);
        return res.send('Failed to enrol in course');
      }

      res.redirect(`/courses/${courseId}?enrolSuccess=true`);
    });
  });
};