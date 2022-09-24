require("dotenv").config();

const config = {
  dbPort: process.env.PORT || 3000,
  dbURL: process.env.DATABASE_URL,
  secret: process.env.JWT_SECRET,
};

module.exports = { config };
