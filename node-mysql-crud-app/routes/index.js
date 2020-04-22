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
};
