const express = require("express");
const app = express();
const winston = require("winston");
const bodyParser = require("body-parser");
const port = 3000;
const API_KEY = process.env.SENDGRID_API_KEY;
const session = require("express-session");
const store= new session.MemoryStore()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "some secret", //change later to something more secure
    cookie: { maxAge: 30000 }, //how log in milisec until the session exprires
    saveUninitialized: false, //this makes it so that it doesnt generate a new session id everytime a user makes a request to the server and instead generates a new session id when the user logs in
    store: store //replace with the database so that the session will be saved there instead of the memory(store)
  })
);

//winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

//winston logger added to every endpoints
app.all("*", (req, res, next) => {
  logger.log({
    level: "info",
    method: req.method,
    url: req.url,
    body: req.body,
    params: req.params,
    timestamp: new Date().toLocaleString(),
  });
  next();
});


app.use((req, res, next )=>{
    console.log(store) //change to database
    console.log(`${req.method} - ${req.url}`)
    next()
})

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.post('/login', (req, res) => {
    console.log(req.sessionID);
    // console.log(store)
    const { username, password } = req.body;
    if (username && password) {
      if (req.session.authenticated) {
        // User is already authenticated, return session data
        res.json(req.session);
      } else {
        if (password == 123) {   //change so that if password matches the hashed password in the database
          req.session.authenticated = true;
          req.session.user = {
            username,
            password //dont show password in the final draft just display the username or any other data needed
          };
          res.json(req.session);
        } else {
          res.sendStatus(403);
        }
      }
    } else {
      res.sendStatus(403);
    }
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
