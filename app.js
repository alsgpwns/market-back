const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const passport = require('passport');
const passportConfig = require('./passport');
const { sequelize } = require('./models');

dotenv.config();
sequelize
  .sync()
  .then(() => console.log('connected database'))
  .catch((err) => console.error(err));

const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');

const production = process.env.NODE_ENV === 'production';
const PORT = production ? 80 : 4000;
passportConfig();
if (production) {
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(hpp());
} else {
  app.use(morgan('dev'));
}
app.enable('trust proxy');
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'upload')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
    secret: process.env.COOKIE_SECRET,
    proxy: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/product', productRouter);
app.use('/auth', authRouter);

app.get('/', (req, res, next) => {
  production ? res.send(`it\'s production!`) : res.send(`dev mode`);
});

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
