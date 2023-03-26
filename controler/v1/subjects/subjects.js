const util = require("util");
const config = require("../../../config");

const con = config.mysql_connection

// return subjects list
exports.getSubjects = async (req, res, next) => { 
    try {
        let subjects = await getSubjects();
        return res.status(200).send({ code: 200, data: subjects });

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

// create subject
exports.postCreateSubject = async (req, res, next) => { 
    try {
        let query = req.body;
        let name = query.name;

        if (!name || name == '') return res.send({ code: 400, message: "Please provide required details." });

        let subjectId = await createSubject(name);
        if (subjectId == 0) return res.send({ code: 400, message: "Failed to save subject." });

        return res.status(200).send({ code: 201, message: "Subject saved successfully." })

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

const getSubjects = async () => {
    let query = `select id, name from subjects where is_deleted=0`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result
};

const createSubject = async (name) => {
    let query = `insert into subjects (name) values ('${name}')`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result.insertId ? result.insertId : 0;
};