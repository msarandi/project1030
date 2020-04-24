module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM FS1030.portfolio ORDER BY id ASC"; 

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
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
  


};
