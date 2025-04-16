const Datastore = require('nedb');
const path = require('path');

const db = new Datastore({ filename: path.join(__dirname, '../db/bookings.db'), autoload: true });

exports.createBooking = (booking, callback) => db.insert(booking, callback);
exports.getBookingsByClass = (classId, callback) => db.find({ classId }, callback);
exports.findBooking = (classId, email, callback) => {
    db.findOne({ classId, email }, callback);
  };
exports.insertMany = (bookings, callback) => {
  db.insert(bookings, callback);
};
exports.removeBooking = (classId, email, callback) => {
  db.remove({ classId, email }, {}, callback);
};