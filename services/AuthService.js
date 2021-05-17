const client = require('../config/db');
const dbName = "users";
const collectionName = "usercoll";
const db = client.db(dbName).collection(collectionName);

const bcrypt = require('bcrypt'); 

exports.verifyUser = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    const usernameExists = await db.find({ username: username }).toArray();
    if (usernameExists.length == 0) {
        res.send({ code: '021', message: 'Username does not exists'});
    } else {
        const dbPassword = usernameExists[0]['password'];

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.compare(password, dbPassword, function(err, res) {
                console.log(res)
            }) // handle error
        })
        res.send({ result: 1 })
    }
}

exports.addUser = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    let validateUsernameStatus = await validateUsername(username);
    let validatePasswordStatus = validatePassword(password);
    
    if (validateUsernameStatus == '006') {
        res.send({ code: '006', message: 'Username is not available' });
    } else if (validateUsernameStatus == '000') {
        console.log('username valid')
        if (validatePasswordStatus == '000') {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    await db.insertOne({ username: username, password: hash });
                })
            })
            res.send({ code: '1', message: 'User signed up successfully' });
        } else { 
            res.send({ code: validatePasswordStatus, message: 'User failed to sign up due to invalid password' })
        }
    } else {
        res.send({ code: validatePasswordStatus, message: 'User failed to sign up due to invalid username' })
    }
}

async function validateUsername(username) {
    let validateUsernameStatus;
    let usernameExist = await getUsers(username);

    let specialChars = /[!@#$%^&*()_+=\[\]{};':"\\|,<>\/?]/;
    let lowercase = /[a-z]/;
    
    if (username == '') { validateUsernameStatus = '001'; } 
    else if (username.length < 6) { validateUsernameStatus = '002'; } 
    else if (username.length > 100) { validateUsernameStatus = '003'; } 
    else if (username.match(specialChars)) { validateUsernameStatus = '004'; } 
    else if (!username.match(lowercase)) { validateUsernameStatus = '005'; } 
    else if (usernameExist == 'invalid') {
        validateUsernameStatus = '006';
    }
    else {
        console.log('status 000') 
        validateUsernameStatus = '000'; 
    }
    return validateUsernameStatus;
}

async function getUsers(username) {
    const result = await db.find({ username: username }).toArray();
    if (result.length > 0) {
        return 'invalid';
    } else {
        return 'valid';
    }
} 

function validatePassword(password) {
    let validatePasswordStatus;
    let specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    let lowercase = /[a-z]/;
    let uppercase = /[A-Z]/;
    let number = /[0-9]/

    if (password == '') { validatePasswordStatus = '011'; } 
    else if (password.length < 6) { validatePasswordStatus = '012'; } 
    else if (password.length > 100) { validatePasswordStatus = '013'; } 
    else if (!password.match(specialChars)) { validatePasswordStatus = '014'; } 
    else if (!password.match(lowercase)) { validatePasswordStatus = '015'; } 
    else if (!password.match(uppercase)) { validatePasswordStatus = '016'; } 
    else if (!password.match(number)) { validatePasswordStatus = '017'; } 

    else { validatePasswordStatus = '000'; }
    return validatePasswordStatus;
}