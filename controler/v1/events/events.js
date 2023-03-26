const util = require("util");
const config = require("../../../config");

const con = config.mysql_connection

// return event details by id
exports.getEvent = async (req, res, next) => { 
    try {
        let eventId = req.params.eventId;

        let event = await getEvent(eventId);
        if (!event || !event.id) return res.send({ code: 400, message: "Event not found." }); 

        event.students = await getStudents(event.batch_id);
        event.mentors = await getMentors(event.id);
        return res.status(200).send({ code: 200, data: event });

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

// return events list
exports.getEvents = async (req, res, next) => { 
    try {
        let events = await getEvents();
        return res.status(200).send({ code: 200, data: events });

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

// create event
exports.postCreateEvent = async (req, res, next) => { 
    try {
        let query = req.body;
        let name = query.name;
        let description = query.description ? query.description : "";
        let batch_id = query.batch_id;
        let event_datetime = query.event_datetime;
        let mentors = query.mentors;

        if (!name || name == '' || !batch_id || batch_id == '' || !event_datetime || event_datetime.length == '' || !mentors || mentors.length == 0) return res.send({ code: 400, message: "Please provide required details." });

        let event_id = await createEvent(name, description, batch_id, event_datetime);
        if (event_id == 0) return res.send({ code: 400, message: "Failed to save event." });

        await saveEventMentorMapping(event_id, mentors)

        return res.status(200).send({ code: 201, message: "Batch saved successfully." })

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

// return eevent students performance
exports.getEventStudentsPerformance = async (req, res, next) => { 
    try {
        let eventId = req.params.eventId;

        let event = await getEvent(eventId);
        if (!event || !event.id) return res.send({ code: 400, message: "Event not found." });

        let performance = await getStudentsPerformace(eventId);
        return res.status(200).send({ code: 200, data: JSON.parse(performance) });

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

// save event students performance
exports.postEventStudentsPerformance = async (req, res, next) => { 
    try {
        let eventId = req.params.eventId;

        let event = await getEvent(eventId);
        if (!event || !event.id) return res.send({ code: 400, message: "Event not found." });

        let performance_data = req.body.performance;
        if (!performance_data || performance_data.length == 0) return res.send({ code: 400, message: "Please provide required details." });

        let performance = await savePerformace(eventId, JSON.stringify(performance_data));
        if (!performance) return res.send({ code: 400, message: "Failed to save performance." }); 
        return res.status(200).send({ code: 201, message: "Performance saved successfully." });

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

const getEvent = async (eventId) => {
    let query = `select e.id, e.name, e.description, e.event_datetime, batch_id, b.name as batch from events as e left join batches as b on e.batch_id=b.id where e.is_deleted=0 and e.id=${eventId}`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result.length > 0 ? result[0] : {};
};

const getEvents = async () => { 
    let query = `select id, name, description, event_datetime from events`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result;
};

const createEvent = async (name, description, batch_id, event_datetime) => {
    let query = `insert into events (name, description, batch_id, event_datetime) values ('${name}','${description}','${batch_id}','${event_datetime}')`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result.insertId ? result.insertId : 0;
};

const saveEventMentorMapping = async (event_id, mentors) => {
    for (let index = 0; index < mentors.length; index++) {
        let query = `insert into event_teachers_mapping (user_id, event_id) values ('${mentors[index]}','${event_id}')`;
        console.log(query);
        con.query = await util.promisify(con.query);
        let result = await con.query(query);

    }
};

const getStudents = async (batchId) => {
    let query = `select s.id,s.name from batch_students_mapping as bm left join students as s on bm.student_id=s.id where bm.batch_id=${batchId}`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result
};

const getMentors = async (eventId) => {
    let query = `select u.id,u.name from event_teachers_mapping as tm left join users as u on tm.user_id=u.id where tm.event_id=${eventId}`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result
};

const getStudentsPerformace = async (eventId) => {
    let query = `select performance_json from event_performance where event_id=${eventId}`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result.length > 0 ? result[0].performance_json : [];
};

const savePerformace = async (eventId, performance_data) => { 
    let query = `insert into event_performance (event_id, performance_json) values ('${eventId}','${performance_data}')`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result.insertId ? result.insertId : 0; 
};