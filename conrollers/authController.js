const User = require('../models/User');
const jwt = require('jsonwebtoken');

const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require('../tokens/tokens');

//@desc register user
//@route POST /api/auth/signup
//@access public
const signup_post = async (req, res) => {
  const { email, password, username, userType } = req.body;

  const isNotUnique = await User.findOne({ email });

  if (isNotUnique) {
    return res.status(400).json({
      result: 'failed',
      message: 'Ten email już istnieje - użyj innego',
    });
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
      userType,
    });

    res.status(200).json({ result: 'success', message: 'User created', user });
  } catch (err) {
    console.log(err.message, 'signup_post');
    res.status(400).json({ result: 'failed', message: err.message });
  }
};

//@desc get all users
//@route POST /api/auth/getallusers
//@access private

//@todo - auth

const all_users_get = async (req, res) => {
  try {
    const allUsers = await User.find();

    res.status(200).json({
      result: 'success',
      count: allUsers.length,
      message: 'Pobrano dane o użytkownikach',
      users: allUsers,
    });
  } catch (err) {
    res.status(400).json({ result: 'failed', message: err.message });
  }
};

//@desc login user
//@route POST /api/auth/login
//@access public

const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);


    if (!user) {
      return res.json({
        message: 'Logowanie nieudane.',
        result: 'error',
      });
    } else {
      const accessToken = createAccessToken(user._id, user.userType);
      const refreshToken = createRefreshToken(user._id);

      await User.updateOne(
        { _id: user._id },
        {
          $set: {
            refreshToken,
          },
        }
      );
      sendRefreshToken(res, refreshToken);
      sendAccessToken(req, res, accessToken, user.username);
    }
  } catch (err) {
    return res.status(400).json({
      result: 'failed',
      orginalMessage: err.message,
      message: 'Nieudane logowanie. Błędny email lub hasło.',
    });
  }
};

//@desc refresh token
//@route POST /api/auth/refresh_token
//@access private

//@todo - auth

const refreshToken_post = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.send({ accessToken: '', msg: 'Brak tokena odświerzającego.' });
  }

  let payload = null;

  try {
    payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return res.send({ accessToken: '', msg: 'Token odświerzający niezgodny' });
  }

  const user = await User.findOne({ _id: payload.userId });

  if (!user || user.refreshToken !== token) {
    return res.send({ accessToken: '', msg: 'Nie znaleziono użytkownika' });
  }

  const accessToken = createAccessToken(user._id, user.userType);
  const refreshToken = createRefreshToken(user._id);

  await User.updateOne(
    { _id: user._id },
    {
      $set: {
        refreshToken,
      },
    }
  );

  sendRefreshToken(res, refreshToken);
  return res.send({ accessToken, loggedInUsername: user.username });
};

//@desc login user
//@route POST /api/auth/login
//@access public

//@todo - auth

const logout_post = (req, res) => {
  res.clearCookie('refreshToken', {
    path: '/api/auth/refresh_token',
  });
  return res.json({ result: 'success', message: 'Poprawnie wylogowano' });
};

//
//
//
//
//
//

module.exports = {
  signup_post,
  all_users_get,
  login_post,
  refreshToken_post,
  logout_post,
};
