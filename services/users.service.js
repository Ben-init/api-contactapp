const db = require("./../db");
const bcrypt = require("bcrypt");

class UserService {
  constructor() {}

  async passwordHash(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  async findId(id) {
    const client = await db.connect();

    try {
      const response = await db.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      const contactResponse = await db.query(
        "SELECT * FROM contacts WHERE user_id = $1",
        [id]
      );
      const contacts = contactResponse.rows;
      const user = response.rows[0];
      user.contacts = contacts;

      if (user.password) {
        delete user.password;
      }
      return user;
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }

  async findEmail(email) {
    const client = await db.connect();
    try {
      const user = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      return user.rows[0];
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }

  async newUser(data) {
    const client = await db.connect();
    try {
      const createdOn = new Date();
      const hash = await this.passwordHash(data.password);
      const newData = {
        ...data,
        password: hash,
      };
      const response = await db.query(
        "INSERT INTO users(name, email, password, created_on) VALUES($1, $2, $3, $4) RETURNING * ",
        [newData.name, newData.email, newData.password, createdOn]
      );
      const user = response.rows[0];
      if (user.password) {
        delete user.password;
      }
      return user;
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }

  async updateUser(id, data) {
    const client = await db.connect();
    try {
      const userData = await this.findId(id);
      const updatedUser = {
        ...userData,
        ...data,
      };

      if (data.password) {
        const hash = this.passwordHash(data.password);
        updatedUser.password = hash;
      }
      const response = await db.query(
        "UPDATE contacts SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
        [updatedUser.name, updatedUser.num, updatedUser.password, id]
      );
      const user = response.rows[0];
      if (user.password) {
        delete user.password;
      }
      return user;
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }

  async dropUser(id) {
    const client = await db.connect();
    try {
      const response = await db.query(
        "DELETE FROM users WHERE id = $1 RETURNING *",
        [id]
      );
      const user = response.rows[0];
      if (user.password) {
        delete user.password;
      }
      return user;
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }
}

module.exports = UserService;
