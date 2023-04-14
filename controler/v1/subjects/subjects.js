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

exports.postUpdateSubject = async (req, res, next) => {
    try {
        let subjectId = req.params.subjectId;
        let name = req.body.name;
        let description = req.body.description;

        let isUpdate = await updateSubject(subjectId, name, description);
        if (isUpdate) {
            return res.status(200).send({ code: 200, message: "Subject updated successfully." })
        }

        return res.status(200).send({ code: 400, message: "Subject failed to update." })

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

exports.postDeleteSubject = async (req, res, next) => {
    try {
        let subjectId = req.params.subjectId;

        let isdelete = await deleteSubject(subjectId);
        if (isdelete) {
            return res.status(200).send({ code: 200, message: "Subject deleted successfully." })
        }

        return res.status(200).send({ code: 400, message: "Subject failed to delete." })

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

const getSubjects = async () => {
    let query = `select id, name, description from subjects where is_deleted=0`;
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

const updateSubject = async (subjectId, name, description) => {
    let query = `update subjects set name='${name}', description='${description}' where id=${subjectId} and is_deleted=0`;
    con.query = util.promisify(con.query);
    let result = await con.query(query);
    return result.affectedRows;
};

const deleteSubject = async (subjectId) => {
    let query = `update subjects set is_deleted=1 where id=${subjectId} and is_deleted=0`;
    con.query = util.promisify(con.query);
    let result = await con.query(query);
    return result.affectedRows;
};