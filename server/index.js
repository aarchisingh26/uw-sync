// const express = require("express");
// const app = express();
// const cors = require("cors");
// const pool = require("./db");

// //middleware
// app.use(cors());
// app.use(express.json());


// app.use((req, res, next) => {
//     res.setHeader(
//       "Access-Control-Allow-Origin",
//       "https://uw-sync.vercel.app"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//     );
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     res.setHeader("Access-Control-Allow-Private-Network", true);
//     //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
//     res.setHeader("Access-Control-Max-Age", 7200);
  
//     next();
//   });
  
  

// //ROUTES

// //get a exam
// // app.get("/exams/:course", async (req, res) => {
// //     try {
// //         const { course } = req.params;
// //         const exams = await pool.query("SELECT * FROM exams WHERE course = $1", [course]);
// //         // console.log(req.params);
// //         res.json(exams.rows[0]);
// //     } catch (err) {
// //         console.error(err.message);
// //     }
// // });

// //search for exam
// //query parameter
// app.get("/exams", async (req, res) => {
//     try {
//         const { courseName } = req.query;
//         const exams = await pool.query("SELECT * from exams WHERE course ILIKE $1", [`%${courseName}%`]);

//         res.json(exams.rows);

//     } catch (err) {
//         console.error(err.message);
//     }
// });


// app.listen(5002, () => {
//     console.log("server has started on port 5002");
// });


const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Configure CORS
const corsOptions = {
  origin: 'https://uw-sync.vercel.app/',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE',
  allowedHeaders: 'Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers',
  credentials: true,
  maxAge: 7200,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

// ROUTES

app.get("/exams", async (req, res) => {
    try {
        const { courseName } = req.query;
        console.log(`Received query parameter: courseName=${courseName}`);
        const exams = await pool.query("SELECT * from exams WHERE course ILIKE $1", [`%${courseName}%`]);
        res.json(exams.rows);
    } catch (err) {
        console.error(err.message);
        console.error("Error fetching exams:", err.message);
        res.status(500).send('Server Error');
    }
});

app.listen(5002, () => {
    console.log("server has started on port 5002");
});
