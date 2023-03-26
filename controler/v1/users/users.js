const util = require("util");
const config = require("../../../config");

const con = config.mysql_connection

// return user by id
exports.getUser = async (req, res, next) => {
    try {
        let userId = req.params.userId;

        let user = await getUser(userId);
        if (!user || !user.id) return res.send({ code: 400, message: "user not found." });

        return res.status(200).send({ code: 200, data: user });

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

// return users list
exports.getUsers = async (req, res, next) => {
    try {
        let users = await getUsers();
        return res.status(200).send({ code: 200, data: users });

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

const getUser = async (userId) => {
    let query = `select u.id,u.name, u.about,email,role_id, r.name as role from users as u left join roles as r on u.role_id=r.id where u.is_deleted=0 and u.id=${userId}`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result.length > 0 ? result[0] : {};
};

const getUsers = async () => {
    let query = `select u.id,u.name, u.about,email,role_id, r.name as role from users as u left join roles as r on u.role_id=r.id where u.is_deleted=0`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result
};