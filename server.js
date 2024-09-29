// import dependencies
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mysql = require('mysql2');
const PORT = process.env.PORT || 5000
// configure environment variable
dotenv.config();
app.use(express.json());


// GET METHOD EXAMPLE
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// connect to database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

});

//  test for connection
db.connect((err)=>{
    if(err){
   return console.log('Error connecting to Database:', err);
    }
    // connection successful
    console.log('Successfully Connected to Database', db.threadId);
})

// test API endpoint
app.get('/', (req,res) =>{
    res.send('Hello, welcome to my sql database connection');
})


// Retrieve all patients
app.get('/patients', (req, res) => {
    const query = "SELECT * FROM patients";
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err.message);
        }
        res.status(200).json(results);
    });
});

// retrieve all providers
app.get('/providers', (req, res) => {
    const query = "SELECT * FROM providers";
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err.message);
            }
            res.status(200).json(results);
            });
        });
        // filter patients by First name
app.get('/patients/firstName', (req, res) => {
    const query = "SELECT first_name FROM patients";
            db.query(query, req.params.firstName, (err, results) => {
                if (err) {
                    res.status(500).send(err.message);
                    }
                    res.status(200).json(results);
        });
});

         // Retrieve all providers by their specialty
app.get('/providers/specialty', (req, res) => {
            const query = "SELECT  first_name, provider_specialty FROM providers ORDER BY provider_specialty";
            db.query(query, req.params.specialty, (err, results) => {
                if (err) {
                    res.status(500).send(err.message);
                    }
                    res.status(200).json(results);
        });
});








// start and listen to server
app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`)

});

