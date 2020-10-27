const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Muszisz podać nazwę uzytkownika.'],
    // minlength: [
    //   2,
    //   'Nazwa uzytkownika musi składać się co najmniej z 2 znaków.',
    // ],
    // maxlength: [2, 'Nazwa uzytkownika może składać się najwyżej z 3 znaków.'],
    trim: true,
    validate: [
      /^[A-Za-z]{2,3}$/,
      'Nazwa uzytkownika może składać się z 2 lub 3 liter (inicjały)',
    ],
    uppercase: true,
    unique: [true, 'Ta nazwa użytkownika już istnieje.'],
  },
  email: {
    type: String,
    required: [true, 'Musisz podać email.'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Wprowadzono niepoprawny email.'],
  },
  password: {
    type: String,
    required: [true, 'Musisz podać hasło.'],
    validate: [
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Hasło musi zawierać co najmiej 8 znaków, w tym co najmniej jedną małą literę, jedną wielką literę, jedna cyfrę oraz jeden znak specjalny.',
    ],
    maxlength: [32, 'Hasło nie może składać się więcej niż z 32 znaków.'],
  },
  userType: {
    type: String,
    enum: ['oper', 'admin'],
    default: 'oper',
  },
  refreshToken: {
    type: String,
    default: '',
  },
});

//FIRE FUNCTION BEFORE DOC IS SAVED
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    }

    throw Error('Niepoprawne dane logowania - błędny email lub hasło.');
  }
  throw Error('Niepoprawne dane logowania - błędny email lub hasło.');
};

const User = mongoose.model('user', userSchema);
module.exports = User;
