const express= require('express')
const app = express()
const port = 3000
const bcrypt = require('bcrypt')

app.use(express.json());

const { User } = require('./models');

app.post('/api')