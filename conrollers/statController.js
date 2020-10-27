const Duty = require('../models/Duty');

const getAllDutiesInMonth_get = async (req, res) => {
  const { year, month } = req.params;

  try {
    const searchParam = `${year}-${month}-??`;

    const duties = await Duty.find({ dutyDate: { $regex: `${searchParam}` } });
    return res.status(200).json({
      result: 'success',
      count: duties.length,
      message: 'Udało się pobrać dane.',
      duties,
    });
  } catch (err) {
    return res.status(500).json({
      result: 'failed',
      orginalMessage: err.message,
      message: 'Przepraszmy, coś poszło nie tak.',
    });
  }
};

module.exports = {
  getAllDutiesInMonth_get,
};
