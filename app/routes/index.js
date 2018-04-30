const express = require('express');
let router = express.Router();
const User = require('../model/user');

router.get('/', (req, res) => {
    User.find().lean().exec((err, users) => {
        return (err)
            ? res.status(400).json(err)
            : res.status(200).json(users);
    });
});

router.post('/', (req, res) => {
    const user = req.body;
    User.create(user, (err, user) => {
        if (err) {
            switch (err.code) {
                case 11000: // Duplicate key error collection
                    res.status(409).json(err);
                    break;
                default:
                    res.status(400).json(err);
                    break;
            }
        } else {
            res.status(201).json(user);
        }
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    User.findOne({ '_id': id}, (err, user) => {
        return (err)
            ? res.status(400).json(err)
            : (user)
                ? res.status(200).json(user)
                : res.status(404).json();
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    User.deleteOne({ '_id': id }, (err) => {
        return (err)
            ? res.status(400).json(err)
            : res.status(204).json();
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const attributes = req.body;
    User.findOneAndUpdate({ '_id': id }, attributes, (err, user) => {
        return (err)
            ? res.status(400).json(err)
            : res.status(200).json(user);
    })

});

module.exports = router;