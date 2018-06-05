const router = require('express').Router();
const Friend = require('./friendModel');




router
    .route('/')
    .get((req, res) => {
        Friend.find()
            .then(friends => {
                console.log(friends);
                res.status(200);
                res.json(friends);
            })
            .catch(error => {
                console.log(error);
                res.status(500);
                res.json({ errorMessage: "Friends could not be gotten"});
            })
    })
    .post((req, res) => {
        const { firstName, lastName, age } = req.body;
        if (!firstName || !lastName || !age) {
            res.status(400);
            res.json({ errorMessage: "Please provide firstName, lastName and age for the friend."});
            return;
        }
    
    const newFriend = new Friend({ firstName, lastName, age });
    newFriend
        .save()
        .then(savedFriend => {
            res.status(201);
            res.json(savedFriend);
        })
        .catch(error => {
            res.status(500);
            res.json({errorMessage: "There was an error while saving the friend to the database."});
        })

    })






module.exports = router;