const fs = require('fs');

module.exports = {
    addResumePage: (req, res) => {
        res.render('add-resume.ejs', {
            title: "Welcome | Add To Resume"
            , message: ''
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

        // SQL statement sent to db to retrive from contact table to retrieve column named title to check if data already exists 

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
            // If not existing, SQL statement sent to db to add a new row to resume table
            let query = "INSERT INTO `resume` (month, year, title, description) VALUES ('" + month + "','" + year + "', '" + resumeTitle + "', '" + resumeDescription + "')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/resume');

            });
        });

    },


    //SQL statement to retrieve row from resume table through id selected 
    editResumePage: (req, res) => {
        let resumeId = req.params.id;
        let query = "SELECT * FROM `resume` WHERE id = '" + resumeId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-resume.ejs', {
                title: "Edit Resume"
                , resumes: result[0]
                , message: ''
            });
        });
    },



    editResume: (req, res) => {
        let resumeId = req.params.id;
        let month = req.body.month;
        let year = req.body.year;
        let resumeTitle = req.body.title;
        let resumeDescription = req.body.description;

        //SQL statement to update row from resume table through id selected 

        let query = "UPDATE `resume` SET `month` = '" + month + "', `year` = '" + year + "',`title` = '" + resumeTitle + "', `description` = '" + resumeDescription + "' WHERE `resume`.`id` = '" + resumeId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/resume');
        });
    },



    //SQL statement to delete row from resume table through id selected 
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



