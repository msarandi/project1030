const fs = require('fs');

module.exports = {
    addPortfolioPage: (req, res) => {
        res.render('add-portfolio.ejs', {
            title: "Welcome | Add To Portfolio"
            ,message: ''
        });
    },
    addPortfolio: (req, res) => {
        if (!req.body.title) {
            return res.status(400).send("Submission was not uploaded.");
        }

        let message = '';
        let title = req.body.title;
        let description = req.body.description;
       


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
                        // send the submission details to the database
                        let query = "INSERT INTO `portfolio` (title, description) VALUES ('" +
                            title + "', '" + description + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        
                    });
                });
                    
    },
    editPortfolioPage: (req, res) => {
        let portfolioId = req.params.id;
        let query = "SELECT * FROM `portfolio` WHERE id = '" + portfolioId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-portfolio.ejs', {
                title: "Edit Portfolio"
                ,portfolios: result[0]
                ,message: ''
            });
        });
    },
    editPortfolio: (req, res) => {
        let portfolioId = req.params.id;
        let title = req.body.title;
        let description = req.body.description;
        let number = req.body.number;

        let query = "UPDATE `portfolio` SET `title` = '" + title + "', `description` = '" + description + "' WHERE `portfolio`.`id` = '" + portfolioId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
  
  
  
 /*  deletePortfolioSubmission: (req, res) => {
        let portfolioId = req.params.id;
        let deleteUserQuery = 'DELETE FROM portfolio WHERE id = "' + portfolioId + '"';

        
           
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            }*/

        }; 

    

    