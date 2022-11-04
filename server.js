const express = require("express");
const app = express();
const fetch = require('node-fetch');
require('dotenv').config()

// parse data
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/subscribe', async (req, res) => {
    if (req.body.captcha === undefined || 
        req.body.captcha === '' || 
        req.body.captacha === null)
    return res.json({ success: false, msg: 'Please select captcha' });


 // verify url
 const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

 //  request to verify url
 const body = await fetch(verifyUrl).then(res => res.json());


 // if captcha not verified 
  if (body.success !== undefined && !body.success)
  return res.json({ success: false, msg: 'captcha failed' });

// if captcha verified
return res.json({ success: true, msg: 'captcha verfied' });
});


// set port
PORT = 8080

// running server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
