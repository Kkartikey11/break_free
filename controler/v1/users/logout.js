const util = require("util");

const config = require("../../../config");

const con = config.mysql_connection; 

exports.postLogout = async (req, res, next) => { 
    
    //implement code here

    return res.status(200).send({code: 200, message: "User logged out successfully."})
};