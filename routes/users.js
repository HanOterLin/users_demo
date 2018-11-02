const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/all-users', function (req, res) {

    const {user} = APP.db;
    user.findAll()
        .then(data => {
            res.json({
                code: 0,
                data: data.filter(item => item.user_is_active),
            })
        })
        .catch(err => {
            res.json({
                code: 1,
                err,
            });
        });

});

router.post('/update-user', function (req, res) {

    const payload = req.body;
    const condition = {
        user_id: payload.user_id,
    };
    const data = {
        user_name: payload.user_name,
        user_email: payload.user_email,
        user_pwd: payload.user_pwd,
    };
    const {user} = APP.db;

    user.findOne({where: condition})
        .then(user => {
            for (let key in data) {
                if (data.hasOwnProperty(key) && user[key]) {
                    user[key] = data[key];
                }
            }
            return user.save();
        })
        .then(() => {
            res.json({
                code: 0,
            });
        })
        .catch(err => {
            res.json({
                code: 1,
                err,
            });
        });

});

router.post('/add-user', function (req, res) {

    const payload = req.body;
    const {user} = APP.db;

    user.create(payload)
        .then(data => {
            res.json({
                code: 0,
            });
        })
        .catch(err => {
            res.json({
                code: 1,
                err,
            });
        });

});

router.post('/remove-user', function (req, res) {

    const payload = req.body;
    const condition = {
        user_id: payload.id
    };
    const {user} = APP.db;

    user.findOne({where: condition})
        .then(user => {
            user.user_is_active = false;
            return user.save();
        })
        .then(() => {
            res.json({
                code: 0,
            });
        })
        .catch(err => {
            res.json({
                code: 1,
                err,
            });
        });
});


module.exports = router;
