



// Question 1 ----- Explain generally, what is meant by a NoSQL database.

// NoSQL er god til skalere op til at understøtte et stort klientel
// Der er ikke relation mellem tabellerne og de er gemt som dokumenter.
// Har altid en høj consistent performance.
// Simpelt design
// Bedre kontrol over tilgængeligheden.








//  Question 2 -----    Explain how databases like MongoDB and redis would be classified in the NoSQL world

/*
Hvad er Redis?
Redis er en Key-Value Store type (Database)
Den er kendt for at være ekstremt hurtigt.



Hvad er MongoDB?
MongoDB er et Document Store Type (Database)

*/







// Question 3 Explain about indexes in MongoDB, how to create them, and demonstrate how you ----------------------------
//have used them.

/*
Man kan lave indexes på collections i MongoDB.
Dette gør at man kan søge i databasen hurtigere.

Hvis ikke der er en index kan man køre - db.collection.createIndex(). Der er bla text og geospatial indexes.
 */







// Question 4 Explain, using your own code examples, how you have used some of MongoDB's -------------------------------
//"special" indexes like TTL and 2dsphere

/*
TTL Indexes er til for at MongoDB selv sletter documenter fra en collection efter en bestemt tid.

 var user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user'], expireAt: new Date()};
 userss.createIndex({"expireAt" : 1}, {expireAfterSeconds: 5})
*/

/*

 A 2dsphere index supports queries that calculate geometries on an earth-like sphere. 2dsphere index supports all
 MongoDB geospatial queries: queries for inclusion, intersection and proximity. See the Geospatial Query Operators
 for the query operators that support geospatial queries.

 The 2dsphere index supports data stored as GeoJSON objects and as legacy coordinate pairs (See also 2dsphere
 Indexed Field Restrictions). For legacy coordinate pairs, the index converts the data to GeoJSON Point.
 For details on the supported GeoJSON objects, see GeoJSON Objects.

 */





// Question 5 Explain how redis "fits" into the NoSQL world, and provide an example of how you -------------------------
//have used it.







// Question 6 ----- Explain, using a relevant example, a full MEAN application (the A, can be an ionic
// application)

// kør routes.js for at starte serveren og derefter højre klik og tryk kør på index.html
// api pathsne er /create, /get, /delete, /update, og står under routes.js



// MongoDB -----------------------------------------------------------------------------------------------------


//     MongoDB (all CRUD operations)


//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/ex3a';

var userss = "";
var dben = "";

exports.connect =  function (cb)
{
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    var users = db.collection('users');
     dben = db
    userss = users;
    if (err) {
        cb('Unable to connect to the mongoDB server. Error:', err);
    } else {
        //HURRAY!! We are connected. :)
        cb('Connection established to', url);



        // --- RUN HERE ---

        // update();
        // findAll();
        // deleteLast();
        // insert();

    }
})
}

exports.insert =  function (cb)
{

    var user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user'], expireAt: new Date()};
    var user2 = {name: 'modulus user', age: 22, roles: ['user']};
    var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};

    userss.createIndex({"expireAt" : 1}, {expireAfterSeconds: 5})

userss.insertMany([user1, user2, user3], function (err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:',
            result.length, result);
        cb(result);
    }

});
    dben.close();
}


exports

exports.findAll =  function (cb)
{
userss.find().toArray(function (err, result) {
    console.log("her er alle menneskerne i byen - ");

    result.forEach(function (user)
        {
            console.log("name: " + user.name + ", age: " +  user.age )
        }

    )
    cb(result)
    dben.close();

});

}

exports.deleteLast =  function (callback)
{
userss.find().toArray(function (err, result) {
console.log(result[result.length-1].age)
    userss.remove( { _id: result[result.length-1]._id }, function (x){
        callback("sletningen er gennemført")
        dben.close();
    } )
});
}

exports.update =  function (cb)
{
    userss.find().toArray(function (err, result) {

        userss.updateOne(
            { age : result[0].age },
            {
                $set: { age: 5}
            },
            function(y)
            {

                cb("updateringen er gennemført")

            }
        )

    })
}






