const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
const {addPortfolioPage, addPortfolio, deletePortfolio, editPortfolio, editPortfolioPage} = require('./routes/portfolio');
const {getResumeHomePage} = require ('./routes/index');
const {addResumePage, addResume, deleteResume, editResume, editResumePage} = require('./routes/resume');
const {getContactHomePage} = require ('./routes/index');
const {addContactPage, addContact, deleteContact, editContact, editContactPage} = require('./routes/contact');

const port = 3000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'nodeclient',
    password: '123456',
    database: 'FS1030'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// Portfolio Routes
app.get('/', getHomePage);
app.get('/add', addPortfolioPage);
app.get('/edit/:id', editPortfolioPage);
app.get('/delete/:id', deletePortfolio); 
app.post('/add', addPortfolio); 
app.post('/edit/:id', editPortfolio); 

// Resume Routes
app.get('/resume', getResumeHomePage);
app.get('/addresume', addResumePage);
app.get('/editresume/:id', editResumePage);
app.get('/deleteresume/:id', deleteResume); 
app.post('/addresume', addResume); 
app.post('/editresume/:id', editResume); 


// Contact Routes
app.get('/contact', getContactHomePage);
app.get('/addcontact', addContactPage);
app.get('/editcontact/:id', editContactPage);
app.get('/deletecontact/:id', deleteContact); 
app.post('/addcontact', addContact); 
app.post('/editcontact/:id', editContact); 



// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});