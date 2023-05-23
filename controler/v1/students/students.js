const util = require("util");
const config = require("../../../config");

const con = config.mysql_connection

// return students list
exports.getStudents = async (req, res, next) => {
    try {
        let grade_id = req.query.grade_id;
        let students = await getStudents(grade_id);
        return res.status(200).send({ code: 200, data: students });

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

// create student
exports.postCreateStudent = async (req, res, next) => {
    try {
        let query = req.body;
        let name = query.name;
        let email = query.email;
        let grade_id = query.grade_id;

        if (!name || name == '' || !email || email == '' || !grade_id || grade_id == '') return res.send({ code: 400, message: "Please provide required details." });

        let studentId = await createStudent(name, email, grade_id);
        if (studentId == 0) return res.send({ code: 400, message: "Failed to save student." });

        return res.status(200).send({ code: 201, message: "Student saved successfully." })

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

// create student
exports.postEditStudent = async (req, res, next) => {
    try {
        let studentId = req.params.studentId;
        let query = req.body;
        let name = query.name;
        let email = query.email;
        let grade_id = query.grade_id;

        let isUpdate = await updateStudent(studentId, name, email, grade_id);
        if (isUpdate) {
            return res.status(200).send({ code: 200, message: "Student updated successfully." })
        }

        return res.status(200).send({ code: 400, message: "Student failed to update." })

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

exports.postDeleteStudent = async (req, res, next) => {
    try {
        let studentId = req.params.studentId;

        let isdelete = await deleteStudent(studentId);
        if (isdelete) {
            return res.status(200).send({ code: 200, message: "Student deleted successfully." })
        }

        return res.status(200).send({ code: 400, message: "Student failed to delete." })

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

const getStudents = async (grade_id) => {
    let where = 'where s.is_deleted=0';
    if (grade_id) {
        where += ` and grade_id=${grade_id}`
    }
    let query = `select s.id,s.name,email,grade_id,g.name as grade from students as s left join grades as g on s.grade_id=g.id ${where}`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result
};

const createStudent = async (name, email, grade_id) => {
    let query = `insert into students (name, email, grade_id) values ('${name}','${email}','${grade_id}')`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result.insertId ? result.insertId : 0;
};

const updateStudent = async (studentId, name, email, grade_id) => {
    let query = `update students set name='${name}', email='${email}', grade_id='${grade_id}' where id='${studentId}' and is_deleted=0`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result.affectedRows;
};

const deleteStudent = async (studentId) => {
    let query = `update students set is_deleted=1 where id=${studentId} and is_deleted=0`;
    con.query = util.promisify(con.query);
    let result = await con.query(query);
    return result.affectedRows;
};