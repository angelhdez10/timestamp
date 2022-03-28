// server.js
// where your node app starts

// init project
import dot from 'dotenv';
dot.config();
import express from 'express';
var app = express();
import fetch from 'node-fetch';
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
import cors from 'cors';
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  console.log(req.X-FORWARDED-FOR)
  res.json({greeting: 'hello API'});
});

app.get("/api/whoami", async (req, res) => {
  console.log(req.client, 'hola')
  const ip = await fetch('https://api.ipify.org?format=json').then(res => res.json());
  console.log(ip)
  res.json({
    ipaddress: `${ip.ip}`,
    language: req.headers['accept-language'],
    software: req.headers['user-agent'],

  })
})



// listen for requests :)
var listener = app.listen(process.env.PORT || 3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
