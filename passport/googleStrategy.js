const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const dotenv = require('dotenv');
const { User } = require('../models/user');

dotenv.config();
module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existUser = await User.findOne({
            where: { email: profile.emails },
          });
          if (existUser) {
            done(null, existUser);
          } else {
            const newUser = await User.create({});
            done(null, newUser);
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      },
    ),
  );
};
