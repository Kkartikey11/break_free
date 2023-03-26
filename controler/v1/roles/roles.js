const util = require("util");
const config = require("../../../config");

const con = config.mysql_connection

// return roles list
exports.getRoles = async (req, res, next) => { 
    try {
        let roles = await getRoles();
        return res.status(200).send({ code: 200, data: roles });

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

// create role
exports.postCreateRole = async (req, res, next) => {
    try {
        let query = req.body;
        let name = query.name;

        if (!name || name == '') return res.send({ code: 400, message: "Please provide required details." });

        let roleId = await createRole(name);
        if (roleId == 0) return res.send({ code: 400, message: "Failed to save grade." });

        return res.status(200).send({ code: 201, message: "Role saved successfully." })

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

const getRoles = async () => {
    let query = `select id, name from roles where is_deleted=0`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result
};

const createRole = async (name) => {
    let query = `insert into roles (name) values ('${name}')`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result.insertId ? result.insertId : 0;
};