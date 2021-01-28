const router = require('express').Router();
const passport = require('passport');
const { isNotLogin, isLogin } = require('../middlewares');

router.get('/logout', isLogin, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/google', isNotLogin, passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/');
  },
);

module.exports = router;
