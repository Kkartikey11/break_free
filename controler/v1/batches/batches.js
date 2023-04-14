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

// delete batch by id
exports.postDeleteBatch = async (req, res, next) => {
    try {
        let batchId = req.params.batchId;

        let isdelete = await deleteBatch(batchId);
        if (isdelete) {
            return res.status(200).send({ code: 200, message: "Batch deleted successfully." })
        }

        return res.status(200).send({ code: 400, message: "Batch failed to delete." })

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

// return batches list
exports.getBatches = async (req, res, next) => { 
    try {
        let batches = await getBatches();
        for (let index = 0; index < batches.length; index++) {
            let batch = await getBatch(batches[index].id);
            batches[index] = batch;
            batches[index].students = await getStudents(batch.id);
            
        }
        return res.status(200).send({ code: 200, data: batches });

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

exports.updateBatch = async (req, res, next) => { 
    try {
        let batchId = req.params.batchId;

        let isBatch = await getBatch(batchId);
        if (!isBatch || !isBatch.id) return res.send({ code: 400, message: "Please provide valid batch id." });

        let query = req.body;
        let name = query.name;
        let description = query.description ? query.description : "";
        let subject_id = query.subject_id;
        let added_students = query.added_students;
        let deleted_students = query.deleted_students;

        if ((!name || name == '') & (!subject_id || subject_id == '') & ((!added_students || added_students.length == 0) & (!deleted_students || deleted_students.length == 0))) return res.send({ code: 400, message: "Please provide required details." });

        let isUpdated = await updateBatch(batchId, name, description, subject_id);
        if (isBatch) {
            await updateBatchStudentsMapping(batchId, added_students, deleted_students);
            return res.status(200).send({ code: 200, message: "Batch updated successfully." })
        }

        return res.status(200).send({ code: 400, message: "Batch failed to update." })

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
    let query= `select s.id,s.name from batch_students_mapping as bm left join students as s on bm.student_id=s.id where bm.batch_id=${batchId} and bm.is_deleted=0`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result
};

const updateBatch = async (batchId, name, description, subject_id) => { 
    try {
        let set = [];
        if (name && name != '') set.push(`name='${name}'`);
        if (description && description != '') set.push(`description='${description}'`);
        if (subject_id && subject_id != '') set.push(`subject_id=${subject_id}`);
    
        let query = `update batches set ${set.join()} where id=${batchId}`;
        con.query = await util.promisify(con.query);
        let result = await con.query(query);
        return true
    } catch (error) {
        console.log("Error: ", error);
        return false;
    }
    

};

const updateBatchStudentsMapping = async (batchId, added_students, deleted_students) => {
    if (added_students && added_students.length > 0) {
        con.query = await util.promisify(con.query);
        for (let index = 0; index < added_students.length; index++) {
            const student_id = added_students[index];
            let isMappedQuery = `select id from batch_students_mapping where batch_id=${batchId} and student_id=${student_id} and is_deleted=0`
            let isStudentMapped = await con.query(isMappedQuery); 
            if (isStudentMapped.length === 0) {
                let query = `insert into batch_students_mapping (batch_id,student_id) values (${batchId}, ${student_id})`;
                let result = await con.query(query); 
            }
            
        }
    }
    if (deleted_students && deleted_students.length > 0) {
        for (let index = 0; index < deleted_students.length; index++) {
            const student_id = deleted_students[index];
            let query = `update batch_students_mapping set is_deleted=1 where batch_id=${batchId} and student_id=${student_id}`;
            con.query = await util.promisify(con.query);
            let result = await con.query(query);
        }
    }

};

const deleteBatch = async (batchId) => {
    let query = `update batches set is_deleted=1 where id=${batchId} and is_deleted=0`;
    con.query = util.promisify(con.query);
    let result = await con.query(query);
    return result.affectedRows;
};