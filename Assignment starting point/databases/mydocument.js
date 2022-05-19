const mongoose = require('mongoose');

//The URL which will be queried. Run "mongod.exe" for this to connect
//var url = 'mongodb://localhost:27017/test';
const mongoDB = 'mongodb://localhost:27017/mydocument';

mongoose.Promise = global.Promise;

connection = mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    checkServerIdentity: false,
})
    .then(() => {
        console.log('connection to mongodb worked!');
    })
    .catch((error) => {
        console.log('connection to mongodb did not work! ' + JSON.stringify(error));
    });


// db.dropDatabase();

//  MORE GENERAL WAY WOULD BE TO CALL:
// try {
//     var connection = mongoose.createConnection(mongoDB);
//     console.log("connection to mongodb worked!");
// }catch (e) {
// console.log('error in db connection: ' +e.message)
// }
//
// WHICH WOULD ALLOW MULTIPLE CONNECTIONS

