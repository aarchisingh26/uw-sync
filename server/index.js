const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//get a exam
// app.get("/exams/:course", async (req, res) => {
//     try {
//         const { course } = req.params;
//         const exams = await pool.query("SELECT * FROM exams WHERE course = $1", [course]);
//         // console.log(req.params);
//         res.json(exams.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

//search for exam
//query parameter
app.get("/exams", async (req, res) => {
    try {
        const { courseName } = req.query;
        const exams = await pool.query("SELECT * from exams WHERE course ILIKE $1", [`%${courseName}%`]);

        res.json(exams.rows);

    } catch (err) {
        console.error(err.message);
    }
});


app.listen(5002, () => {
    console.log("server has started on port 5002");
});