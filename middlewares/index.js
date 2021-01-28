exports.isLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('Login is required.');
  }
};

exports.isNotLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('Login is not required.');
  }
};
