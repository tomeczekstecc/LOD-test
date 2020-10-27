const Router = require('express');
const router = Router();
const {
  addDuty_post,
  deleteDuty_delete,
} = require('../conrollers/dutyController');
const { requireAuth } = require('../middleware/authMiddleware');


router.post(
  '/add',
  requireAuth,
  addDuty_post
);
router.delete(
  '/delete/:id',
  requireAuth,
  deleteDuty_delete
);

module.exports = router;
