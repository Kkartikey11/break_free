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

// update user by id
exports.postUpdateUser = async (req, res, next) => {
    try {
        let userId = req.params.userId;
        var query = req.body;
        let name = query.name;
        let email = query.email;
        let about = query.about;
        let role_id = query.role_id;

        let saveuser = await updateUser(userId, name, email, about, role_id);

        if (saveuser) {
            return res.send({ code: 200, message: "User updated successfuly." });
        } else {
            return await Error.error_400(res, 'Failed to update user.');
        }

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

// delete user by id
exports.postDeleteUser = async (req, res, next) => {
    try {
        let userId = req.params.userId;

        let isDelete = await deleteUser(userId);

        if (isDelete) {
            return res.send({ code: 200, message: "User deleted successfuly." });
        } else {
            return await Error.error_400(res, 'Failed to delete user.');
        }

    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(200).send({ code: 400, message: error.message });
    }
};

// update user by id
exports.postUploadUserProfilePicture =  async (req, res, next) => {
    try {
        // upload.single('image')
        let userId = req.params.userId;
        const file = req.file;
        console.log(file); // Output information about the uploaded file
        const publicUrl = `${req.protocol}://${req.get('host')}/images/${file.filename}`;
        // res.send(`File uploaded successfully! Public URL: ${publicUrl}`);
        let isUpdated = await updateUserProfile(userId, `images/${file.filename}`);
        if (!isUpdated) {
            return res.status(200).send({ code: 400, message: 'Failed to upload user profile.' });
        }
        return res.status(200).send({ code: 200, url: `${publicUrl}`, message: `Profile image uploaded successfully!` });

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
    let query = `select u.id,u.name, u.about,email,role_id, r.name as role, profile_url from users as u left join roles as r on u.role_id=r.id where u.is_deleted=0`;
    con.query = await util.promisify(con.query);
    let result = await con.query(query);
    return result
};

const updateUser = async (user_id, name, email, about, role_id) => {
    let query = `update users set name='${name}', email='${email}', about='${about}', role_id='${role_id}' where id=${user_id} and is_deleted=0`;
    con.query = util.promisify(con.query);
    let result = await con.query(query);
    return result.affectedRows;
};

const updateUserProfile = async (user_id, profile_url) => {
    let query = `update users set profile_url='${profile_url}' where id=${user_id} and is_deleted=0`;
    con.query = util.promisify(con.query);
    let result = await con.query(query);
    return result.affectedRows;
};

const deleteUser = async (user_id) => {
    let query = `update users set is_deleted='1' where id=${user_id} and is_deleted=0`;
    con.query = util.promisify(con.query);
    let result = await con.query(query);
    return result.affectedRows;
};