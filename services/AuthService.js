const client = require('../config/db');
const dbName = "users";
const collectionName = "usercoll";
const db = client.db(dbName).collection(collectionName);

async function getUsers(username) {
    const result = await db.find({ username: username }).toArray();
    if (result.length > 0) {
        return 'invalid';
    } else {
        return 'valid';
    }
}

exports.addUser = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    let verifyUsernameStatus = await verifyUsername(username);
    let verifyPasswordStatus = verifyPassword(password);
    
    if (verifyUsernameStatus == '006') {
        res.send({ code: '006', message: 'Username is not available' });
    } else if (verifyUsernameStatus == '000') {
        console.log('username valid')
        if (verifyPasswordStatus == '000') {
            // await db.insertOne({ username: username, password: password });
            res.send({ code: '1', message: 'User signed up successfully' });
        } else { 
            res.send({ code: verifyPasswordStatus, message: 'User failed to sign up due to invalid password' })
        }
    } else {
        res.send({ code: verifyPasswordStatus, message: 'User failed to sign up due to invalid username' })
    }
}

exports.authenticateUser = async (req, res, next) => {
    let user = {
        username: req.body.username,
        password: req.body.password
    }
    console.log('this is authenticate user')
    next(user)
}

async function verifyUsername(username) {
    let verifyUsernameStatus;
    let usernameExist = await getUsers(username);

    let specialChars = /[!@#$%^&*()_+=\[\]{};':"\\|,<>\/?]/;
    let lowercase = /[a-z]/;
    
    if (username == '') { verifyUsernameStatus = '001'; } 
    else if (username.length < 6) { verifyUsernameStatus = '002'; } 
    else if (username.length > 100) { verifyUsernameStatus = '003'; } 
    else if (username.match(specialChars)) { verifyUsernameStatus = '004'; } 
    else if (!username.match(lowercase)) { verifyUsernameStatus = '005'; } 
    else if (usernameExist == 'invalid') {
        verifyUsernameStatus = '006';
    }
    else {
        console.log('status 000') 
        verifyUsernameStatus = '000'; 
    }
    return verifyUsernameStatus;
}

function verifyPassword(password) {
    let verifyPasswordStatus;
    let specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    let lowercase = /[a-z]/;
    let uppercase = /[A-Z]/;
    let number = /[0-9]/

    if (password == '') { verifyPasswordStatus = '011'; } 
    else if (password.length < 6) { verifyPasswordStatus = '012'; } 
    else if (password.length > 100) { verifyPasswordStatus = '013'; } 
    else if (!password.match(specialChars)) { verifyPasswordStatus = '014'; } 
    else if (!password.match(lowercase)) { verifyPasswordStatus = '015'; } 
    else if (!password.match(uppercase)) { verifyPasswordStatus = '016'; } 
    else if (!password.match(number)) { verifyPasswordStatus = '017'; } 

    else { verifyPasswordStatus = '000'; }
    return verifyPasswordStatus;
}