const util = require("util");

var config = require("../../../config");

const con = config.mysql_connection;
const Crypto = require('crypto-js');

exports.PostRegister = async (req, res, next) => {
    try {
        var query = req.body;
        let name = query.name;
        let email = query.email;
        let about = query.about;
        let role_id = query.role_id;
        let password = query.password;

        if ((!name || name == null) || (!email || email == null) || (!role_id || role_id == null) || (!password || password == null)) {
            return res.send({ code: 400, message: 'Please provide required details.' });
        }

        let has_user = await getUser(email);
        console.log(has_user);
        if (has_user) {
            return res.send({ code: 400, message: 'User already exist.' });
        }
        let encrypePassword = encrypt(password);
        let saveuser = await createUser(name, email, about, role_id, encrypePassword);

        if (saveuser) {
            return res.send({ code: 200, message: "User created successfuly." });
        } else {
            return await Error.error_400(res, 'Error in creating user.');
        }
    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }

}

// encrype user password
const encrypt =  (password) => {
    const secret_key = process.env.SECRET_KEY;
    ciphertext = Crypto.AES.encrypt(password, secret_key).toString();
    return ciphertext
};

const getUser = async (email) => {
    let query = `select id from users where email like'${email}'`;
    con.query = util.promisify(con.query);
    let result = await con.query(query)
    if (result.length > 0) {
        return true;
    }
    return false;
};

const createUser = async (name, email, about, role_id, encrypePassword) => {
    let query = `insert into users (name, email, about, role_id, password) values ('${name}','${email}','${about}','${role_id}','${encrypePassword}')`;
    console.log(query);
    con.query = util.promisify(con.query);
    let result = await con.query(query);
    return result.affectedRows;
};