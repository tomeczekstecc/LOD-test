const Router = require('express');
const router = Router();
const { requireAuth } = require('../middleware/authMiddleware');
const { getAllDutiesInMonth_get } = require('../conrollers/statController');

router.get(
  '/getallinmonth/:year/:month',
  // requireAuth,
  getAllDutiesInMonth_get
);


module.exports = router