const Datastore = require('nedb');
const path = require('path');

const db = new Datastore({ filename: path.join(__dirname, '../db/classes.db'), autoload: true });

exports.addClass = (classData, callback) => {
  if (classData.date && classData.time) {
    const datetime = new Date(`${classData.date}T${classData.time}`);
    classData.timestamp = datetime.getTime();
  }

  db.insert(classData, callback);
};

exports.getClassesByCourse = (courseId, callback) => {
  db.find({ courseId }, callback);
};

exports.getClassById = (id, callback) => db.findOne({ _id: id }, callback);
exports.deleteClass = (id, callback) => db.remove({ _id: id }, {}, callback);
exports.updateClass = (id, data, callback) => {
  if (data.date && data.time) {
    const datetime = new Date(`${data.date}T${data.time}`);
    data.timestamp = datetime.getTime();
  }

  db.update({ _id: id }, { $set: data }, {}, callback);
};

exports.removeByCourse = (courseId, callback) => {
    db.remove({ courseId }, { multi: true }, callback);
  };
  