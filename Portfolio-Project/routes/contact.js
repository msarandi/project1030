const fs = require('fs');

module.exports = {
    addContactPage: (req, res) => {
        res.render('add-contact.ejs', {
            title: "Welcome | Add To Contact"
            ,message: ''
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
                        // send the submission details to the database
                        let query = "INSERT INTO `contact` (firstname, lastname, email) VALUES ('" + firstName + "','" + lastName + "', '" + contactEmail + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/contact');
                        
                    });
                });
                    
    },
    editContactPage: (req, res) => {
        let contactId = req.params.id;
        let query = "SELECT * FROM `contact` WHERE id = '" + contactId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-contact.ejs', {
                title: "Edit Contact"
                ,contacts: result[0]
                ,message: ''
            });
        });
    },
    editContact: (req, res) => {
        let contactId = req.params.id;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let contactEmail = req.body.contactEmail;
       
        

        let query = "UPDATE `contact` SET `firstname` = '" + firstName + "', `lastname` = '" + lastName + "',`email` = '" + contactEmail + "' WHERE `contact`.`id` = '" + contactId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/contact');
        });
    },
  
  
  
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

    

    