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

    
    getPortfolioHomePage: (req, res) => {
        let query = "SELECT * FROM portfolio ORDER BY id ASC"; 

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/portfolio');
            }
            res.render('p-index.ejs', {
                title: "Welcome | View Portfolio"
                ,portfolios: result
            });
        });
    },
    getResumeHomePage: (req, res) => {
        let query = "SELECT * FROM resume ORDER BY id ASC"; 

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/resume');
            }
            res.render('resume-index.ejs', {
                title: "Welcome | View Resume"
                ,resumes: result
            });
        });
    },

    getContactHomePage: (req, res) => {
        let query = "SELECT * FROM contact ORDER BY id ASC"; 

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/contact');
            }
            res.render('contact-index.ejs', {
                title: "Welcome | View contact"
                ,contacts: result
            });
        });
    },
  


};
