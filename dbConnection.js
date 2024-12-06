const mysql = require("mysql2");

const db_connection = mysql.createConnection({
  host: "localhost", // Адрес сервера базы данных
  user: "root", // Имя пользователя для MySQL
  password: "Ghj1004edf4jr", // Пароль для MySQL
  database: "group_familia" // Имя вашей базы данных
})
.on("error", (err) => {
  console.log("Failed to connect to Database - ", err);
});

module.exports = db_connection;
