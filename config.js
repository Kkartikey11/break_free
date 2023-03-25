var mysql = require("mysql")
var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    insecureAuth: true
});

connection.connect(function (error) {
    if (error) {
        throw error;
    }
    console.log("MySql connected!");
})

module.exports = {
    "mysql_connection": connection
};