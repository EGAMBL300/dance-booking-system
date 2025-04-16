const Datastore = require('nedb');
const bcrypt = require('bcrypt');
const path = require('path');

const db = new Datastore({ filename: path.join(__dirname, '../db/users.db'), autoload: true });

const saltRounds = 10;

exports.createUser = function (username, password, role, callback) {
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return callback(err);
    const user = { username, password: hash, role };
    db.insert(user, callback);
  });
};

exports.findUser = function (username, callback) {
  db.findOne({ username }, callback);
};

exports.getAllOrganisers = function (callback) {
  db.find({ role: 'organiser' }, callback);
};

exports.deleteUser = function (userId, callback) {
  db.remove({ _id: userId }, {}, callback);
};