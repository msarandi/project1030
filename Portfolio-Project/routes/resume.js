const fs = require('fs');

module.exports = {
    addResumePage: (req, res) => {
        res.render('add-resume.ejs', {
            title: "Welcome | Add To Resume"
            ,message: ''
        });
    },
    addResume: (req, res) => {
        if (!req.body.resumeTitle) {
            return res.status(400).send("Submission was not uploaded.");
        }

        let message = '';
        let month = req.body.month;
        let year = req.body.year;
        let resumeTitle = req.body.resumeTitle;
        let resumeDescription = req.body.resumeDescription;
       


        let resumeTitleQuery = "SELECT * FROM `resume` WHERE title = '" + resumeTitle + "'";

        db.query(resumeTitleQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Title already exists';
                res.render('add-resume.ejs', {
                    message,
                    title: "Welcome | Add To Resume"
                });
            } 
                        // send the submission details to the database
                        let query = "INSERT INTO `resume` (month, year, title, description) VALUES ('" + month + "','" + year + "', '" + resumeTitle + "', '" + resumeDescription + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/resume');
                        
                    });
                });
                    
    },
    editResumePage: (req, res) => {
        let resumeId = req.params.id;
        let query = "SELECT * FROM `resume` WHERE id = '" + resumeId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-resume.ejs', {
                title: "Edit Resume"
                ,resumes: result[0]
                ,message: ''
            });
        });
    },
    editResume: (req, res) => {
        let resumeId = req.params.resumeId;
        let month = req.body.month;
        let year = req.body.year;
        let title = req.body.resumeTitle;
        let description = req.body.resumeDescription;
        

        let query = "UPDATE `resume` SET `month` = '" + month + "', `year` = '" + year + "',`title` = '" + resumeTitle + "', `description` = '" + resumeDescription + "' WHERE `resume`.`id` = '" + resumeId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/resume');
        });
    },
  
  
  
 deleteResume: (req, res) => {
        let resumeId = req.params.id;
        let deleteUserQuery = 'DELETE FROM `resume` WHERE id = "' + resumeId + '"';

        
           
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/resume');
                });
            }

        }; 

    

    