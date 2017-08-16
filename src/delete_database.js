//Requiring the package
var PouchDB = require('PouchDB');

//Creating the database object
var db = new PouchDB('my_database');

//deleting database
db.destroy(function (err, response) {
   if (err) {
      return console.log(err);
   } else {
      console.log ("Database Deleted”);
   }
});
