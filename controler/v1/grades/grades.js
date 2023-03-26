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