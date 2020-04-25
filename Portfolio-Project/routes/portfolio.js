const fs = require('fs');

module.exports = {

    addPortfolioPage: (req, res) => {
        res.render('add-portfolio.ejs', {
            title: "Welcome | Add To Portfolio"
            , message: ''
        });
    },
    addPortfolio: (req, res) => {
        if (!req.body.title) {
            return res.status(400).send("Submission was not uploaded.");
        }

        let message = '';
        let title = req.body.title;
        let description = req.body.description;


        // SQL statement sent to db to retrive from contact table to retrieve column named title to check if data already exists 

        let titleQuery = "SELECT * FROM `portfolio` WHERE title = '" + title + "'";

        db.query(titleQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Title already exists';
                res.render('add-portfolio.ejs', {
                    message,
                    title: "Welcome | Add To Portfolio"
                });
            }

            // If not existing, SQL statement sent to db to add a new row to contact table
            let query = "INSERT INTO `portfolio` (title, description) VALUES ('" +
                title + "', '" + description + "')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/portfolio');

            });
        });

    },

    //SQL statement to retrieve row from portfolio table through id selected 
    editPortfolioPage: (req, res) => {
        let portfolioId = req.params.id;
        let query = "SELECT * FROM `portfolio` WHERE id = '" + portfolioId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-portfolio.ejs', {
                title: "Edit Portfolio"
                , portfolios: result[0]
                , message: ''
            });
        });
    },
    editPortfolio: (req, res) => {
        let portfolioId = req.params.id;
        let title = req.body.title;
        let description = req.body.description;

        //SQL statement to update row from portfolio table through id selected 
        let query = "UPDATE `portfolio` SET `title` = '" + title + "', `description` = '" + description + "' WHERE `portfolio`.`id` = '" + portfolioId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/portfolio');
        });
    },

    //SQL statement to delete row from portfolio table through id selected 

    deletePortfolio: (req, res) => {
        let portfolioId = req.params.id;
        let deleteUserQuery = 'DELETE FROM `portfolio` WHERE id = "' + portfolioId + '"';



        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/portfolio');
        });
    }

};



