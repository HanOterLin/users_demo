'use strict'

const Sequelize = require("sequelize");

const self = {

    init(url) {

        return Promise.resolve()
            .then(() => {

                const db = {};
                const sequelize = new Sequelize(dbURL);

                db.Sequelize = Sequelize;
                db.sequelize = sequelize;


                //Models/tables
                for (let i in APP.models) {
                    if (APP.models.hasOwnProperty(i)) {
                        db[i] = require(APP.models[i])(sequelize, Sequelize);
                        db[i].sync();
                    }
                }

                return db;

            });
    },

};

module.exports = self;

