
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sivakumar@1977",
    database: "studentdb"
});

db.connect((err) => {
    if (err) {
        console.error("❌ MySQL Connection Failed:", err.message);
        process.exit(1);
    }

    console.log("✅ MySQL Connected Successfully");
});

module.exports = db;

