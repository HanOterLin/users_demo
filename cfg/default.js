const path = require('path');
const fs = require('fs');

global._ = require("underscore");

global.APP = {};

setGlobalPath(APP, 'routes');
setGlobalPath(APP, 'models');
setGlobalPath(APP, 'lib');

APP.lib.db_util.init('postgres://postgres:admin@localhost:5432/demo')
    .then(db => {
        APP.db = db;
    });

function setGlobalPath(APP, folder) {

    if(!folder) return;

    const dir = path.join(base_dir, folder);
    APP[folder] = {};

    try{
        fs.readdirSync(dir)
            .forEach(function (file) {
                if (!file && file.slice(-3) === '.js'){
                    let fileName = file.slice(0, file.indexOf('.'));
                    APP[folder][fileName] = path.join(dir, fileName);
                }
            });
    }catch(err){
        console.log(err);
    }

}
