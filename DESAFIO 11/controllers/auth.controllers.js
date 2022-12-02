const register = (req, res, next) => res.redirect('/home');

const login = (req, res, next) => res.redirect('/home');

module.exports = {
  login,
  register,
}