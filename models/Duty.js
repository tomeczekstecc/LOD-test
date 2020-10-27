const mongoose = require('mongoose');
const User = require('./User');

const dutySchema = mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'Musisz podać ID użytkownika.'],
  },
  username: {
    type: String

  },
  dutyDate: {
    type: String,
    required: [true, 'Musisz podać datę.'],
  },
  dutyType: {
    type: String,
    required: [true, 'Musisz wybrać typ aktywności.'],
    enum: ['dutyOn', 'dutyOff'],
  },
});

dutySchema.pre('save', async function (next) {
  const user = await User.find({ _id: this.userId });

  this.username = user[0].username;
  next();
});

const Duty = mongoose.model('duty', dutySchema);
module.exports = Duty;
