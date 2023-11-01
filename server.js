const express= require('express');
const app = express();
const port = 3000
const bcrypt = require('bcrypt');
app.use(express.json());
const { User } = require('./models/user');
app.use(express.json());
const session = require('express-session');
const winston = require('winston')
const { Sequilize, DataTypes} = require('sequelize')


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
    const allUsers = await User.findAll()
    res.send(allUsers)
});

app.get('/register', (req, res) => {
    logger.info({
        level: 'info',
        method: req.method,
        body: req.body,
        url: req.url,
        parameters: req.params,
        timestamp: new Date().toLocaleString()
    })
    res.render('register')
})
// --------------------Get Register-------------------- //
app.get('/register', (req, res) => {
    logger.info({
        level: 'info',
        method: req.method,
        body: req.body,
        url: req.url,
        parameters: req.params,
        timestamp: new Date().toLocaleString()
    })
    res.render('register')
})

// --------------- Register Post --------------- //
app.post('/register', async (req,res)=>{
    const { user_name,firstName, lastName, email, username, password } = req.body;
    // Make sure the first and last name only have Uppercase and lowercase letters.
    const nameRegex = /^[A-Za-z]+$/; 
    // Make sure the password has at least 8 characters and allows for upper and lowercasse letters.
    const passwordRegex =/^(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // Allows for diffrent email endings.
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|net|gov|edu)$/;

    if(!emailRegex.test(email)) {
        return res.status(400).render('register', {failedMessage: 'Invalid email format or ending. Email must end with .com, .net, .gov, or .edu.'});
    }
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        return res.status(400).render('register', { failedMessage: 'First name and last name must contain only letters' });
    }
    if (!passwordRegex.test(password)) {
        return res.status(400).render('register', { failedMessage: 'Password must include at least one uppercase letter, one lowercase letter, one special character, and one number.' });
    }
    const existingEmail = await User.findOne({ where: { email: email } });
    if (existingEmail) {
        return res.status(400).render('register', {failedMessage: 'This email is already being used'} );
    }
    const existingUserName = await User.findone({ where: { username: username } });
    if (existingUserName) {
        return res.status(400).render('register', {failedMessage : 'This username is already being used'} );
    }
    try {
        const saltRounds = 10;
        const hashedPasswords= await bcrypt.hash(password, saltRounds);

        await User.create({
            user_name:user_name,
            firstName: firstName,
            lastName: lastName,
            email: email,
            userName: username,
            password: hashedPasswords
        });
        logger.info({
            level: 'info',
            method: req.method,
            body: req.body,
            url: req.url,
            parameters: req.params,
            timestamp: new Date().toLocaleString()
        });

        res.render('register', { successMessage: 'Account created susccessfully' });
    }catch (error) {
        console.error('Error creating user', error);
        res.status(500).render('register', { error: 'Failed to create user'})
    }
});

app.listen(port, () => {
    console.log(`server is running ${port}`)
})