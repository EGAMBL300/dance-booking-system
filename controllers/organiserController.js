const courseModel = require('../models/courseModel');
const classModel = require('../models/classModel');

exports.showAddCourse = (req, res) => {
    res.render('pages/add-course');
  };
  
  exports.addCourse = (req, res) => {
    const { title, description, type, duration, location } = req.body;
    const imagePath = req.file ? `/images/${req.file.filename}` : null;
  
    const newCourse = {
      title,
      description,
      type,
      duration,
      location,
      image: imagePath
    };
  
    courseModel.addCourse(newCourse, (err) => {
      if (err) return res.send("Failed to add course");
      res.redirect('/dashboard');
    });
  };
  

  exports.showDashboard = (req, res) => {
    const user = req.session.user || { username: 'Guest', role: 'guest' };
    const isOrganiser = user.role === 'organiser';
  
    courseModel.getAllCourses((err, courses) => {
      if (err) return res.send('Error loading dashboard');
  
      res.render('pages/dashboard', {
        user,
        isOrganiser,
        courses,
        dashboardActive: true
      });
    });
  };

  exports.deleteCourse = (req, res) => {
    const id = req.params.id;
    courseModel.deleteCourse(id, (err, numRemoved) => {
      if (err) return res.send("Failed to delete course");
      classModel.removeByCourse(id, (err, numRemovedClasses) => {
        if (err) return res.send("Course deleted, but failed to delete associated classes");
        res.redirect('/dashboard');
      });
    });
  };

  exports.showEditCourse = (req, res) => {
    const id = req.params.id;
    courseModel.getCourseById(id, (err, course) => {
      if (!course) return res.send("Course not found");
      res.render('pages/edit-course', { course });
    });
  };
  
  exports.updateCourse = (req, res) => {
    const courseId = req.params.id;
    const { title, description, type, duration, location } = req.body;
  
    if (!title || !description || !type || !duration || !location) {
      return res.status(400).send("Missing required fields");
    }
  
    const updatedData = {
      title,
      description,
      type,
      duration,
      location
    };
  
    if (req.file) {
      updatedData.image = '/images/' + req.file.filename;
    }
  
    courseModel.updateCourse(courseId, updatedData, (err) => {
      if (err) {
        console.error("Error updating course:", err);
        return res.status(500).send("Failed to update course.");
      }
  
      res.redirect(`/courses/${courseId}`);
    });
  };
  
  
  

  
  