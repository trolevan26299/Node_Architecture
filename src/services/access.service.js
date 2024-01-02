"use strict";

const bcrypt = require("bcrypt");
const shopModel = require("../models/shop.model");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");

const RoleShop = {
  SHOP: "SHOP",
  ADMIN: "000",
  WRITER: "001",
  EDITOR: "002",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // B1: Check email exist
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        return {
          code: "xxxx",
          message: "Shop already registered",
        };
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });

      if (newShop) {
        // create privateKey , publicKey
        // => Tạo privateKey,publicKey by RSA
        // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        //   privateKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        // });
        const privateKey = crypto.getRandomValues(64).toString("hex");
        const publicKey = crypto.getRandomValues(64).toString("hex");

        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
        });

        if (!publicKeyString) {
          return {
            code: "xxxx",
            message: "publicKeyString Error",
          };
        }
        const publicKeyObject = crypto.createPublicKey(publicKeyString);
        // created token pair
        const tokens = await createTokenPair({ userId: newShop._id, email }, publicKeyObject, privateKey);
        console.log("Created Token Success ::", tokens);
        return {
          code: 201,
          metadata: {
            shop: getInfoData({ fields: ["_id", "name", "email"], object: newShop }),
            tokens,
          },
        };
      }
      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
