const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const auth = require('./routes/api/auth')

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//connect to mongodb
mongoose.connect(db)
    .then(() => {
        console.log('mongoDB connected')
    })
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello!')
})
app.use('/api/auth', auth);

const port = process.env.PORT || 7000

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
