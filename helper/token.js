const key = process.env.secretkey;
const jwt = require('jsonwebtoken');
module.exports.createTokenAdmin = (email) => {
    const token = jwt.sign({
        email: email,
        isAdmin: true
    }, key, {
        expiresIn: 20 * 60
    }); //token will expire in 20 minutes..
    return token;
}
module.exports.getTokenAdmin = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (error, result) => {
            if (error) reject(error);
            else resolve(result)
        });
    })
};
module.exports.createTokenUser = (id) => {
    const token = jwt.sign({
        id: id,
        isAdmin: false
    }, key, {
        expiresIn: 20 * 60 *60
    }); //token will expire in 20 minutes..
    return token;
}
module.exports.getTokenUser = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (error, result) => {
            if (error) reject(error);
            else resolve(result)
        });
    })
};