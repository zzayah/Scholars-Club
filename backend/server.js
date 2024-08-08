/*
    SERVER.JS

    Manage account creation and login
    MongoDB
*/


// Express
const express = require('express')
const app = express()

// Bodyparser for requests 
const bodyParser = require('body-parser')
app.use(bodyParser.json());

// Set CORS stuff
function setCorsHead(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
}
app.use(setCorsHead);

// Database manager
const dbMan = require("./dbMan");
dbMan.dbInit();

// Cryptography
const bcrypt = require('bcrypt');
const saltRounds = 10;


// Launch server
const port = 8080;
app.listen(port, () => {
    console.log('Server is running on port ' + port)
})

/*
    Handle login
*/
app.post('/acc/login', (req, res) => {
    // I dont like this but it works ig
    dbMan.getUser(req.body.username).then((result) => {
        if(!result){
            // error out
        }

        var hash = result["hash"];
        if(hash){
            bcrypt
            .compare(req.body.password, hash)
            .then(val => {
                console.log(val);
                if(val === true){
                    console.log("yay!")
                    return res.json({
                        id: result.id,
                    });
                }else{
                    console.log("nah way bro");
                    return res.json({
                        error_message: "Wrong info!",
                    });
                }
                
                return;
            })
            .catch(err => console.error(err.message))      
        }else{
            console.log("Found data but no hash...");
            res.sendStatus(401);
            return;
        }
    });
});

/*
    Handle account creation
*/
app.post('/acc/create', (req, res) => {
    console.log("Account creation request recieved.");
    var username = req.body.username;
    var password = req.body.password;
    var bio = req.body.bio;
    var pfp = req.body.pfp;
    var accType = req.body.accType;

    // Generate user ID
    let userid = '';
    for(i=0; i<19; ++i) userid += Math.floor(Math.random() * 10);
    console.log(userid);

    var tmp;
    dbMan.getUser(username).then(res => {
        tmp = res;
        if(tmp){
            console.log("User exists");
            // return res.json({
            //     status: 401,
            //     error_message: "Username already exists",
            // });
            return res.json({
                error_message: "User already exists",
            });
        }
    });
    

    bcrypt
        .genSalt(saltRounds)
        .then(salt => {
            console.log('Salt: ', salt)
            return bcrypt.hash(password, salt)
        })
        .then(hash => {
            console.log('Hash: ', hash)
            var user = {
                userName: username,
                hash: hash,
                bio: bio,
                pfp: pfp,
                accType: accType,
                id: userid
            };
            dbMan.addUser(user);
            return res.json({
                id: userid,
            });
        })
        .catch(err => { 
            console.error(err.message);
            res.json({
                error_message: "Error!",
            });
            res.sendStatus(401); 
            return; 
        })

});


/*
    User id req
*/
app.post('/acc/iddata', (req, res) => {
    dbMan.getById(req.body.id).then((data) => {
        console.log(data);
        return res.json(data);
    })
    
});