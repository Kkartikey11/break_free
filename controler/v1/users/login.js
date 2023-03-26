const util = require("util");

const config = require("../../../config");

const con = config.mysql_connection; 

const Crypto = require('crypto-js');
const { generateAccessToken } = require('../../../handler/jwt_handler');

exports.postLogin = async (req, res, next) => {
    let query = req.body;
    let email = query.email;
    let password = query.password;
    let result = await getUser(email);
    if (result || result.id) {
        decryptPassword = decrypt(result.password)
        console.log(password,decryptPassword)
        if (password == decryptPassword) {
            let userData = {
                "id": result['id'],
                "name": result['name'],
                "email": result['email'],
                "about": result.about,
                "role_id": result['role_id'],
                "created_at": result['created_at'],
            }
            var generateToken = await generateAccessToken(userData);
            let response = {
                code: 200,
                auth: true,
                "auth-token": generateToken,
                "playload": userData
            };
            return res.send(response)
        } else {
            let response = {
                code: 401,
                auth: false,
            };
            return res.send(response)
        }
    } else {
        let response = {
            code: 404,
            message: "user not found",
            auth: false,
        };
        return res.send(response)
    }

};

// decrype user password
const decrypt = (password) => {
    const secret_key = process.env.SECRET_KEY;
    let bytes = Crypto.AES.decrypt(password, secret_key);
    let originalText = bytes.toString(Crypto.enc.Utf8);
    return originalText
};

const getUser = async (email) => {
    let query = `select u.id,u.name, u.about,email,password,role_id, r.name as role from users as u left join roles as r on u.role_id=r.id where u.is_deleted=0 and u.email='${email}'`;
    console.log(query);
    con.query = util.promisify(con.query);
    let result = await con.query(query);
    return result.length > 0 ? result[0] : {};
};