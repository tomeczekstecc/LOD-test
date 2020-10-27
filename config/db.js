const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const db = process.env.MONGO_DB_URI


const connectDB = async () => {

  try {

    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    })
    console.log('Connected to MongoDB...')

  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }

}

module.exports = connectDB