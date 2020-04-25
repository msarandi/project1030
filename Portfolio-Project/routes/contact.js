const fs = require('fs');

module.exports = {
    addContactPage: (req, res) => {
        res.render('add-contact.ejs', {
            title: "Welcome | Add To Contact"
            , message: ''
        });
    },
    addContact: (req, res) => {
        if (!req.body.contactEmail) {
            return res.status(400).send("Submission was not uploaded.");
        }

        let message = '';
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let contactEmail = req.body.contactEmail;


        // SQL statement sent to db to retrive from contact table to retrieve column named email to check if data already exists 

        let contactEmailQuery = "SELECT * FROM `contact` WHERE email = '" + contactEmail + "'";

        db.query(contactEmailQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Email already exists';
                res.render('add-contact.ejs', {
                    message,
                    title: "Welcome | Add To Contact"
                });
            }

            // If not existing, SQL statement sent to db to add a new row to contact table

            let query = "INSERT INTO `contact` (firstname, lastname, email) VALUES ('" + firstName + "','" + lastName + "', '" + contactEmail + "')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/contact');

            });
        });

    },


    //SQL statement to retrieve row from contact table through id selected 
    editContactPage: (req, res) => {
        let contactId = req.params.id;
        let query = "SELECT * FROM `contact` WHERE id = '" + contactId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-contact.ejs', {
                title: "Edit Contact"
                , contacts: result[0]
                , message: ''
            });
        });
    },
    editContact: (req, res) => {
        let contactId = req.params.id;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let contactEmail = req.body.contactEmail;


        //SQL statement to update row from contact table through id selected 

        let query = "UPDATE `contact` SET `firstname` = '" + firstName + "', `lastname` = '" + lastName + "',`email` = '" + contactEmail + "' WHERE `contact`.`id` = '" + contactId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/contact');
        });
    },

    //SQL statement to retrieve row from portfolio table through id selected 

    deleteContact: (req, res) => {
        let contactId = req.params.id;
        let deleteUserQuery = 'DELETE FROM `contact` WHERE id = "' + contactId + '"';



        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/contact');
        });
    }

};



