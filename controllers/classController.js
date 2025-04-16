const classModel = require('../models/classModel');
const courseModel = require('../models/courseModel');

exports.showAddClass = (req, res) => {
    const courseId = req.params.courseId;
    res.render('pages/add-class', { courseId });
  };
  
  exports.addClass = (req, res) => {
    const courseId = req.params.courseId;
    const { date, time, location, price, description } = req.body;
  
    const datetime = new Date(`${date}T${time}`);
    const timestamp = datetime.getTime();
  
    const classData = {
      courseId,
      date,
      time,
      location,
      price: parseFloat(price),
      description,
      timestamp
    };
  
    classModel.addClass(classData, (err, newClass) => {
      if (err) {
        console.error('Failed to add class:', err);
        return res.send('Error adding class');
      }
  
      res.redirect(`/courses/${courseId}`);
    });
  };
  
exports.deleteClass = (req, res) => {
  const classId = req.params.classId;
  classModel.deleteClass(classId, (err, numRemoved) => {
    if (err) return res.send("Failed to delete class");
    res.redirect('/dashboard');
  });
};

exports.showEditClass = (req, res) => {
  const classId = req.params.classId;
  classModel.getClassById(classId, (err, classData) => {
    if (!classData) return res.send("Class not found");
    res.render('pages/edit-class', { classData });
  });
};

exports.updateClass = (req, res) => {
  const classId = req.params.classId;
  const { date, time, location, price, description } = req.body;

  const data = {
    date,
    time,
    location,
    price: parseFloat(price),
    description
  };

  if (date && time) {
    const datetime = new Date(`${date}T${time}`);
    data.timestamp = datetime.getTime();
  }

  classModel.updateClass(classId, data, (err) => {
    if (err) {
      console.error('Failed to update class:', err);
      return res.send('Error updating class');
    }

    res.redirect(req.get('referer') || '/dashboard');
  });
};

  
  