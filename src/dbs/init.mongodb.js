"use strict";

const mongoose = require("mongoose");
const connectString = `mongodb://localhost:27017/andrew_dev`;
const { countConnect } = require("../helpers/check.connect");

class Database {
  constructor() {
    this.connect();
  }

  // Connect
  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectString)
      .then((_) => {
        console.log(`Connected MongoDB Success : `, countConnect());
      })
      .catch((err) => console.log(`Error Connect with err:`, err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB;
