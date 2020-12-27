const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');

const articles = require('./routes/articles');
const locations = require('./routes/location');
const portfolios = require('./routes/portfolio');
const mail = require('./routes/mailRoute');
const metaFormatter = require('./utils/metaFormatter');
const seoRoute = require('./routes/seoRoute.js');

const app = express();

app.use(cors());
mongoose.connect('mongodb+srv://admin:mUXxvXugD0nzOXb3@cluster0.nj0au.mongodb.net/site?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
  
  if (err) {
    console.log(err);
  }
  console.log('Successfully connected to database');
});

app.post('/api/SRV_STP', (req, res) => {
  process.exit();
  res.send('Stoped :)');
});

app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  next();
});

/* app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  // Getting last character of requested url
  let urlLastChar = req.url[req.url.length - 1];
  // If the url ends with '/', than trim it
  let subUrl = (urlLastChar === '/' && req.url.length > 1) ?
    req.url.substr(0, req.url.length - 1) :
    req.url;
  // Not sure if there's a need to check req.secure
  if ((urlLastChar === '/' && req.url.length > 1) ||
    !req.secure ||
//    req.headers.host === 'www.jem.productions'
          //||
  //  req.headers.host === 'jem.productions'
  ) {
  //  res.redirect(301, 'https://jem.productions' + subUrl);
  } else {
    next();
  }
});
*/

app.get('/', (req, res) => {
  const indexPath = path.resolve(__dirname, 'build', 'index.html');
  metaFormatter(req.url, indexPath).then((result) => {
    if (result instanceof Error) {
      return res.status(500).send(result);
    }
    return res.send(result.formatted);
  });
});

app.use('/api', articles);
app.use('/api', locations);
app.use('/api', portfolios);
app.use('/api', seoRoute);
app.use('/api', mail);

app.use(express.static(`${__dirname}/build`));

app.get('*', (req, res) => {
  const indexPath = path.resolve(__dirname, 'build', 'index.html');
  metaFormatter(req.url, indexPath).then((result) => {
    if (result instanceof Error) {
      return res.status(500).send(result);
    }
    if (!result.isFound) {
      console.log('Not found');
      return res.status(404).send(result.formatted);
    }
    return res.send(result.formatted);
  });
});

https.createServer({
 key: fs.readFileSync('./privateKey.txt', 'utf-8'),
 cert: fs.readFileSync('./cert.txt', 'utf-8')
}, app).listen(8443, () => console.log('listening'));

http.createServer(app, function(req, res) {
res.writeHead(301, { "Location": "https://jem.productions" + req.url });
res.end();
}).listen(7777, () => console.log('list 7777'));

// app.listen(8443, () => console.log('Listening on 8443'));

