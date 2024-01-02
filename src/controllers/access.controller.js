"use strict";

const AccessService = require("../services/access.service");

class AccessController {
  signUp = async (req, res, nex) => {
    try {
      return res.status(201).json(await AccessService.signUp(req.body));
    } catch (error) {
      console.log("có vào 2");
      next(error);
    }
  };
}

module.exports = new AccessController();
