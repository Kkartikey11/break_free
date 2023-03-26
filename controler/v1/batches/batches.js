const util = require("util");
const config = require("../../../config");

const con = config.mysql_connection

// return batch by id
exports.getBatch = async (req, res, next) => { 
    try {
        let batchId = req.params.batchId;

        let batch = await getBatch(batchId);
        if (!batch || !batch.id) return res.send({ code: 400, message: "Batch not found." });

        batch.students = await getStudents(batchId);
        return res.status(200).send({ code: 200, data: batch });

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

// return batches list
exports.getBatches = async (req, res, next) => { 
    try {
        let batches = await getBatches();
        return res.status(200).send({ code: 200, data: batches });

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

// create batch
exports.postCreateBatch = async (req, res, next) => { 
    try {
        let query = req.body;
        let name = query.name;
        let description = query.description ? query.description : "";
        let subject_id = query.subject_id;
        let students = query.students;

        if (!name || name == '' || !subject_id || subject_id == '' || !students || students.length == 0) return res.send({ code: 400, message: "Please provide required details." });

        let batch_id = await createBatch(name, description,       subject_id);
        if (batch_id == 0) return res.send({ code: 400, message: "Failed to save batch." });

        await savebatchStudentMapping(students, batch_id)

        return res.status(200).send({ code: 201, message: "Batch saved successfully." })

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

const getBatch = async (batchId) => {
    let query = `select b.id, b.name, b.description, subject_id, s.name as subject, b.created_at from batches as b left join subjects as s on b.subject_id=s.id where b.is_deleted=0 and b.id=${batchId}`;
    console.log(query);
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result.length > 0 ? result[0] : {};
};

const getBatches = async () => {
    let query = `select b.id, b.name, b.description, subject_id, s.name as subject, b.created_at from batches as b left join subjects as s on b.subject_id=s.id where b.is_deleted=0`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result
};

const createBatch = async (name, description, subject_id) => {
    let query = `insert into batches (name, description, subject_id) values ('${name}','${description}','${subject_id}')`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result.insertId ? result.insertId : 0;
};

const savebatchStudentMapping = async (students, batch_id) => {
    for (let index = 0; index < students.length; index++) {
        let query = `insert into batch_students_mapping (student_id, batch_id) values ('${students[index]}','${batch_id}')`;
        con.query = await util.promisify(con.query);
        let result = await con.query(query);
        
    }
};

const getStudents = async (batchId) => { 
    let query= `select s.id,s.name from batch_students_mapping as bm left join students as s on bm.student_id=s.id where bm.batch_id=${batchId}`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result
};