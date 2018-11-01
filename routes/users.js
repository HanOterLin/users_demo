const express = require('express');
const router = express.Router();
const {User} = db;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/get-all', function (req, res) {

    User.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.end(err);
        });

});

router.post('/update-user', function (req, res) {

    User.findOne(condition)
        .then(user => {
            for (let key in data){
                if(data.hasOwnProperty(key) && user[key]){
                    user[key] = data[key];
                }
            }
            user.save();
        }).catch(err => {
        res.end(err);
    });

});

router.post('/add-user', function (req, res) {

    User.create(payload)
        .catch(err => {
            res.end(err);
        });

});

router.post('/rm-user', function (req, res) {

    User.findOne(condition)
        .then(user => {
            user.user_is_active = false;
            user.save();
        }).catch(err => {
        res.end(err);
    });

});

module.exports = router;
