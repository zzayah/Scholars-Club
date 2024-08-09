/*
    dbMan.js - DataBase manager
*/
const { MongoClient, ServerApiVersion } = require('mongodb');

// MongoDB
const uri = "mongodb+srv://scholarsclubmaster:0RQ02foJxmTI8ssR@scholarsclub.4dzxp.mongodb.net/?retryWrites=true&w=majority&appName=scholarsclub";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Collections
var users;
var threads;

/*
    Init database connection
*/
exports.dbInit = function () {
    console.log("[DBMAN] Initilizing MongoDB connection...");
    try{
        client.connect();
        client.db("admin").command({ ping: 1 });
        users = client.db("accountdata").collection("accountdata");
        threads = client.db("threads").collection("threads");
        console.log("[DBMAN] Database connection initilized.")
    // } catch {
    //     console.log("[DBMAN] Error connecting to MongoDB");
    // }
    } finally {
        
    }
}


/*
    Find a user
*/
exports.getUser = function(username){
    const query = {userName : username};
    const data = users.findOne(query);
    return data;
}
exports.getById = function(userId){
    const query = {id : userId};
    const data = users.findOne(query);
    return data;
}

/*
    Insert new user
*/

exports.addUser = function(user){
    users.insertOne(user, errorHandle);
}

/*
    Create new thread
*/
exports.createThread = function(thread){
    threads.insertOne(thread, errorHandle);
}

/*
    Get all threads
*/
exports.getThreads = function(){
    return threads.find().toArray();
}

/*
    Get thread by id
*/
exports.getThreadByID = function(Tid){
    const query = {id : Tid};
    const data = threads.findOne(query);
    return data; 
}

function errorHandle(err, res){
    if (err) throw err;
};