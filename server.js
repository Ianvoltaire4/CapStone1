const express= require('express');
const app = express();
const port = 3000
const bcrypt = require('bcrypt');
app.use(express.json());
const { Users } = require('./models');
const session = require('express-session');
const winston = require('winston')
const { Sequelize } = require('sequelize');
const users = require('./models/users');
const sequelize = new Sequelize('postgres://hcxkozty:eBmGMZgXYw4TrTQlG8rpI60w4iezXg9X@batyr.db.elephantsql.com/hcxkozty')


app.all('*', (req, res, next) => {
    try {
        logger.info({
            level: 'info',
            method: req.method,
            body: req.body,
            url: req.url,
            parameters: req.params,
            timestamp: new Date().toLocaleString()
        });
        next();
    } catch (error) {
        logger.error({
            level: 'error',
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toLocaleString()
        });
        res.status(500).send('Error');
    }
});


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [

        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

//POST MAN ROUTE FOR USER DATABASE
app.get('/users',async (req,res) => {
    const allUsers = await Users.findAll()
    res.send(allUsers)
});


// app.get('/register', (req, res) => {
//     logger.info({
//         level: 'info',
//         method: req.method,
//         body: req.body,
//         url: req.url,
//         parameters: req.params,
//         timestamp: new Date().toLocaleString()
//     })
//     res.send('register')
// })
// // --------------------Get Register-------------------- //
// app.get('/register', (req, res) => {
//     logger.info({
//         level: 'info',
//         method: req.method,
//         body: req.body,
//         url: req.url,
//         parameters: req.params,
//         timestamp: new Date().toLocaleString()
//     })
//     res.send('register')
// })

// // --------------- Register Post --------------- //
app.post('/register', async (req,res)=>{
    const { user_name,firstName, lastName, email, username, password } = req.body;
    // Make sure the first and last name only have Uppercase and lowercase letters.
    const nameRegex = /^[A-Za-z]+$/; 
    // Make sure the password has at least 8 characters and allows for upper and lowercasse letters.
    const passwordRegex =/^(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // Allows for diffrent email endings.
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|net|gov|edu)$/;

    if(!emailRegex.test(email)) {
        return res.status(400).send('register', {failedMessage: 'Invalid email format or ending. Email must end with .com, .net, .gov, or .edu.'});
    }
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        return res.status(400).send('register', { failedMessage: 'First name and last name must contain only letters' });
    }
    if (!passwordRegex.test(password)) {
        return res.status(400).send('register', { failedMessage: 'Password must include at least one uppercase letter, one lowercase letter, one special character, and one number.' });
    }


    const existingEmail = await Users.findOne({where: {email:email}})
    if (existingEmail) {
        return res.status(400).send('register', {failedMessage: 'This email is already being used'} );
    }
    const existingUserName = await Users.findOne({ where: { username: username } });
    if (existingUserName) {
        return res.status(400).send('register', {failedMessage : 'This username is already being used'} );
    }
    try {
        const saltRounds = 10;
        const hashedPasswords= await bcrypt.hash(password, saltRounds);

        await Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: req.body.hashedPasswords
        });
        logger.info({
            level: 'info',
            method: req.method,
            body: req.body,
            url: req.url,
            parameters: req.params,
            timestamp: new Date().toLocaleString()
        });

        res.send('register', { successMessage: 'Account created susccessfully' });
    }catch (error) {
        console.error('Error creating user', error);
        res.status(500).send('register', { error: 'Failed to create user'})
    }
});

app.listen(port, () => {
    console.log(`server is running ${port}`)
})