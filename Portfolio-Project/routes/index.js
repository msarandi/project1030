module.exports = {
    getPortfolioHomePage: (req, res) => {
        let query = "SELECT * FROM FS1030.portfolio ORDER BY id ASC"; 

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
        let query = "SELECT * FROM FS1030.resume ORDER BY id ASC"; 

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
        let query = "SELECT * FROM FS1030.contact ORDER BY id ASC"; 

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
