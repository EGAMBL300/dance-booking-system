const userModel = require('./models/userModel');

const username = 'admin';
const password = 'admin123';
const role = 'organiser';

userModel.findUser(username, (err, user) => {
  if (user) {
    console.log(`User '${username}' already exists. Skipping.`);
  } else {
    userModel.createUser(username, password, role, (err, newUser) => {
      if (err) {
        console.error('Error creating organiser:', err);
      } else {
        console.log(`Organiser account created: ${username} / ${password}`);
      }
    });
  }
});
