const express = require('express')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors');
const connectDB = require('./config/db')

dotenv.config()

connectDB()

const app = express()

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/auth',require('./routes/authRoutes'))
app.use('/api/duty',require('./routes/dutyRoutes'))
app.use('/api/stat',require('./routes/statRoutes'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
})