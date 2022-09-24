const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const boom = require("@hapi/boom");

const UserService = require("../../../services/users.service.js");

const service = new UserService();

const strategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await service.findEmail(username);

    if (!user) {
      done(boom.unauthorized(), false);
    }
    const verifiedPass = await bcrypt.compare(password, user.password);

    if (!verifiedPass) {
      return done(null, false);
    }
    delete user.password;
    return done(null, user);
  } catch (err) {
    done(err, false);
  }
});

module.exports = strategy;
