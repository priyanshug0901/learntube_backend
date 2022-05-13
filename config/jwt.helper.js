const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("./keys");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "30d",
        issuer: "learn-tube.vercel.app",
        audience: userId,
      };

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(err.message);
        }

        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) {
      next(createError.Unauthorized());
    }

    const authHeader = req.headers["authorization"];
    const bearer = authHeader.split(" ");
    const token = bearer[1];
    JWT.verify(token, ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.message === "JsonWebTokenError" ? "Unauthorized" : err.message;
        next("Please login first,then try again");
      }
      payload = req.payload;
    });
    next();
  },
  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "learn-tube.vercel.app",
        audience: userId,
      };

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(err.message);
        }

        resolve(token);
      });
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err) {
          reject(createError.Unauthorized());
        }
        let userId = payload.aud;
        resolve(userId);
      });
    });
  },
};
