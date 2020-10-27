const Duty = require('../models/Duty');

//@desc add Duty
//@route POST /api/duty/add
//@access private
const addDuty_post = async (req, res) => {
  const { userId, dutyDate, dutyType } = req.body;

  const checkDuty = await Duty.findOne({ userId: req.user.id, dutyDate });

  if (checkDuty) {
    return res.status(400).json({
      result: 'failed',
      message: 'Jesteś już wpisany/a na ten dzień.',
    });
  }

  try {
    const duty = await Duty.create({
      userId: req.user.id,
      dutyDate,
      dutyType,
    });
    return res
      .status(200)
      .json({ result: 'success', message: 'Utworzono dyżur.' })
  } catch (err) {
    return res.json({
      result: 'failed',
      orginalMessage: err.message,
      message: 'Nie udało się utworzyć wpisu.',
    });
  }
};

//@desc add Duty
//@route POST /api/duty/delete
//@access private

const deleteDuty_delete = async (req, res) => {

  try {
    const duty = await Duty.findOne({ _id: req.params.id });

    if (!duty) {
      return res
        .status(400)
        .json({ result: 'failed', message: 'Nie znaleziono takiego dyżuru.' });
    }

    const owner = duty.userId;

    if (
      owner !==req.user.id
    ) {
      console.log('Nie możesz usuwać cudzego dyżuru.');
      return res.status(403).json({
        result: 'failed',
        message: 'Nie możesz usuwać cudzego dyżuru.',
      });
    }

    await Duty.deleteOne({ _id: req.params.id });
    return res
      .status(200)
      .json({ result: 'success', message: 'Usunięto dyżur.' });
  } catch (err) {
    return res.json({
      result: 'failed',
      orginalMessage: err.message,
      message: 'Nie udało się usunąć dyżuru.',
    });
  }
};

module.exports = {
  addDuty_post,
  deleteDuty_delete,
};
