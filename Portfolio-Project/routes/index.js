module.exports = {


    getLogInPage: (req, res) => {
        res.render('index.ejs', {
            title: "Welcome | Admin"
        });

    },

    getLandingPage: (req, res) => {
        res.render('admin.ejs', {
            title: "Welcome | Admin"
        });

    },

    // SQL statement sent to db to retreive from portfolio table labeled portfolio and order by ascending id 

    getPortfolioHomePage: (req, res) => {
        let query = "SELECT * FROM portfolio ORDER BY id ASC";

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/portfolio');
            }
            res.render('p-index.ejs', {
                title: "Welcome | View Portfolio"
                , portfolios: result
            });
        });
    },

    // SQL statement sent to db to retreive from resume table and order by ascending id 
    getResumeHomePage: (req, res) => {
        let query = "SELECT * FROM resume ORDER BY id ASC";

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/resume');
            }
            res.render('resume-index.ejs', {
                title: "Welcome | View Resume"
                , resumes: result
            });
        });
    },

    // SQL statement sent to db to retrive from contact table and order by ascending id 
    getContactHomePage: (req, res) => {
        let query = "SELECT * FROM contact ORDER BY id ASC";

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/contact');
            }
            res.render('contact-index.ejs', {
                title: "Welcome | View contact"
                , contacts: result
            });
        });
    },



};
