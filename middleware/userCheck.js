const getToken = require("../api/auth/token").getTokenUser;
const createToken = require("../api/auth/token").createTokenUser;

module.exports.checkUser = async (req, res, next) => {
  try {
    const token = JSON.parse(req.headers['token']);
    //if no token found, return response (without going to the next middelware)
    if (!token) {
      res.status(401).send({
        "result": "Access denied. No token provided."
      });
      return;
    }
    //if can verify the token, set req.user and pass to next middleware
    const decoded = await getToken(token);
    req.userId = decoded.id;
    next();
  } catch (error) {
    //if invalid token
    res.status(400).send({
      "result": 'error'
    });
  }
};