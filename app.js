const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
const port = 8000;

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
  
var Contact = mongoose.model('Contact', contactSchema);
app.use(bodyParser.urlencoded({ extended: true }));
// For serving static files
app.use('/static', express.static('static'))

// Set the template engine as pug
app.set('view engine', 'pug')

// Set the views directory
app.set('views', path.join(__dirname, 'views'))
 
// Our pug demo endpoint
app.get("/", (req, res)=>{ 
    const params={ }
    res.status(200).render('home.pug', {})
});

app.get("/contact", (req, res)=>{ 
    const params={ }
    res.status(200).render('contact.pug', {})
});

app.post("/contact", (req, res)=>{ 
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This data is saved")
    }).catch(()=>{
        res.status(400).send("Data not saved")
    });
    // res.status(200).render('contact.pug', {})
});

//Start the server
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});