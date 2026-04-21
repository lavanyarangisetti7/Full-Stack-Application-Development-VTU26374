
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db"); // import database connection

const app = express();

/* ===============================
   MIDDLEWARE
================================ */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===============================
   SERVE STATIC FILES
================================ */
app.use(express.static(__dirname));

/* ===============================
   ADD STUDENT API
================================ */
app.post("/api/students/add", (req, res) => {

    const { name, roll, email, course } = req.body;

    if (!name || !roll || !email || !course) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "INSERT INTO students (name, roll, email, course) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, roll, email, course], (err, result) => {

        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        res.json({
            success: true,
            message: "Student registered successfully",
            studentId: result.insertId
        });

    });

});

/* ===============================
   DEFAULT ROUTE
================================ */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

/* ===============================
   START SERVER
================================ */
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
