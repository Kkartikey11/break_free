const util = require("util");
const config = require("../../../config");

const con = config.mysql_connection

// return grades list
exports.getGrades = async (req, res, next) => {
    try {
        let grades = await getGrades();
        return res.status(200).send({ code: 200, data: grades });

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

// update a grade
exports.postUpdateGrade = async (req, res, next) => {
    try {
        let gradeId = req.params.gradeId;
        let name = req.body.name;
        let description = req.body.description;

        let isUpdated = await updateGrade(gradeId, name, description);
        if (isUpdated) {
            return res.status(200).send({ code: 200, message: "Grade updated successfully." })
        }

        return res.status(200).send({ code: 400, message: "Grade failed to update." })

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

// delete a grade
exports.postDeleteGrade = async (req, res, next) => {
    try {
        let gradeId = req.params.gradeId;

        let isdelete = await deleteGrade(gradeId);
        if (isdelete) {
            return res.status(200).send({ code: 200, message: "Grade deleted successfully." })
        }

        return res.status(200).send({ code: 400, message: "Grade failed to delete." })

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

// create grade
exports.postCreateGrade = async (req, res, next) => {

    try {

        let query = req.body;
        let name = query.name;
        let description = query.description ? query.description : "";

        if (!name || name == '') return res.send({ code: 400, message: "Please provide required details." });

        let gradeid = await createGrade(name, description);
        console.log(gradeid);
        if (gradeid == 0) return res.send({ code: 400, message: "Failed to save grade." }); 

        return res.status(200).send({ code: 201, message: "Grade saved successfully." })

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }

};

const getGrades = async () => {
    let query = `select id, name, description from grades where is_deleted=0`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result
};

const createGrade = async (name, description) => { 
    let query = `insert into grades (name, description) values ('${name}', '${description}')`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    console.log(Object.keys(result));
    return result.insertId ? result.insertId : 0;
};

const updateGrade = async (gradeId, name, description) => {
    let query = `update grades set name='${name}', description='${description}' where id=${gradeId} and is_deleted=0`;
    con.query = util.promisify(con.query);
    let result = await con.query(query);
    return result.affectedRows;
};

const deleteGrade = async (gradeId) => {
    let query = `update grades set is_deleted=1 where id=${gradeId} and is_deleted=0`;
    con.query = util.promisify(con.query);
    let result = await con.query(query);
    return result.affectedRows;
};