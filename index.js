/**
 * @author: Carl Trinidad
 */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const user = require('./routes/route_user'); 
const employee = require('./routes/route_employee');  

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const databaseUri = process.env.MONGO_URI;
mongoose.connect(databaseUri)
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((error) => console.error("Database connection failed:", error));

app.get('/', (req, res) => {
    res.send('<h1>Assignment2</h1>');
});

app.use('/api/v1/users', user);  
app.use('/api/v1/employees', employee);  

app.listen(PORT, () => {
    console.log(`Server is live at http://localhost:${PORT}`);
});
