const Router = require('express')
const router = Router()
const { signup_post, all_users_get, login_post, refreshToken_post,logout_post} = require('../conrollers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

router.post('/signup',signup_post);
router.post('/login', login_post);
router.get('/getallusers', requireAuth,all_users_get);
router.post('/logout', logout_post);
router.post('/refresh_token', refreshToken_post);

module.exports = router