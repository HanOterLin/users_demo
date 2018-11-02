'use strict';

const Sequelize = require("sequelize");
process.stdin.setEncoding('utf8');

const db = {};
const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/demo', {logging: false});
db['user'] = require('./../models/user')(sequelize, Sequelize);
db['user'].sync();

let name = undefined;
let pwd = undefined;

let userExist = false;
let isLogin = false;

process.stdout.write('Welcome! Please login. \n\rName:');
process.stdin.on('data', data => {

    const chunk = data.replace(/^\s+|\s+$/g,'');

    if (!userExist) {
        Promise.resolve()
            .then(() => {
                name = chunk;

                if (!chunk.length || chunk.length > 255)
                    throw new Error('Unable to verify input!');

                return db.user.findOne({where: {user_name: chunk}})
                    .then((user) => {
                        if (!user) throw new Error(`user is not exist!`);
                        userExist = true;
                        pwd = user.user_pwd;
                        process.stdout.write('Password:');
                    })

            })
            .catch(err => {
                process.stdout.write(err.message);
                process.stdout.write('\n\rWelcome! Please login. \n\rName:');
            })
    }

    if (userExist && !isLogin) {

            Promise.resolve()
                .then(() => {

                    if (!chunk.length || chunk.length > 255)
                        throw new Error('Unable to verify input!');

                    if (chunk !== pwd) {
                        throw new Error(`Password is not match to ${name}`);
                    } else {
                        isLogin = true;
                        process.stdout.write(`Login successfully! Welcome ${name}!\n\r`);
                        process.exit(0);
                    }

                })
                .catch(err => {
                    process.stdout.write(err.message);
                    process.stdout.write('\n\rPassword:');
                })
    }

})

