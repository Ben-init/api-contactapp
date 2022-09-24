const db = require("./../db");

class ContactService {
  constructor() {}

  async findAll(userId) {
    const client = await db.connect();
    try {
      const response = await db.query(
        "SELECT * FROM contacts WHERE user_id = $1",
        [userId]
      );
      return response.rows;
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }

  async findId(id, userId) {
    const client = await db.connect();
    try {
      const response = await db.query(
        "SELECT * FROM contacts WHERE id = $1 AND user_id = $2",
        [id, userId]
      );
      return response.rows[0];
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }

  async findName(name, userId) {
    const client = await db.connect();
    try {
      console.log(name);
      const response = await db.query(
        "SELECT * FROM contacts WHERE name = $1 AND user_id = $2",
        [name, userId]
      );
      return response.rows;
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }

  async findNum(num, userId) {
    const client = await db.connect();
    try {
      console.log(num, userId);
      const response = await db.query(
        "SELECT * FROM contacts WHERE num = $1 AND user_id = $2",
        [num, userId]
      );
      console.log(response);
      return response.rows[0];
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }

  async newContact(data, userId) {
    const client = await db.connect();
    try {
      const createdOn = new Date();
      const response = await db.query(
        "INSERT INTO contacts(name, num, user_id, created_on) VALUES($1, $2, $3, $4) RETURNING * ",
        [data.name, data.num, userId, createdOn]
      );
      return response.rows[0];
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }

  async updateContact(id, data, userId) {
    const client = await db.connect();
    try {
      const contactData = await this.findId(id, userId);
      const updatedContact = {
        name: contactData.name,
        num: contactData.num,
        ...data,
      };
      const response = await db.query(
        "UPDATE contacts SET name = $1, num = $2 WHERE id = $3 AND user_id= $4 RETURNING *",
        [updatedContact.name, updatedContact.num, id, userId]
      );
      return response.rows[0];
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }

  async dropContact(id, userId) {
    const client = await db.connect();
    try {
      const contact = await db.query(
        "DELETE FROM contacts WHERE id = $1 AND user_id = $2 RETURNING * ",
        [id, userId]
      );
      return contact.rows[0];
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }
}

module.exports = ContactService;
