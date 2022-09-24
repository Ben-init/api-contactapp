const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const { config } = require("./../config");

const router = express.Router();

router.get(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
      };
      const token = jwt.sign(payload, config.secret);
      res.json({ token, user });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
