const express = require('express');
const path = require('path');
const axios = require('axios');
var bodyParser = require('body-parser');
const app = express();
var FormData = require('form-data');
var multer = require('multer');
var upload = multer();

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json({limit : '50mb'}));
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '50mb'
}));
app.use(upload.array()); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/test', (req, res) => {
    res.json({lala : 'lala'});
})

app.get('/api/initiate-jumio-web', async(req, res) => {
  const payload = {
    customerInternalReference : "pannirselvam",
    userReference : "pannir",
    workflowId : 200,
    successUrl : `${req.protocol + "://" + req.headers.host}/success-page`,
    errorUrl : `${req.protocol + "://" + req.headers.host}/error-page`,
    callbackUrl : "https://www.pnmb.com.my/KopTenCoreAPI/api/Kopten/Callback"
  }

  const headers = {
    'Content-Type' : 'application/json',
    'Accept' : 'application/json',
    'Authorization' : 'Basic M2I5MjUxZmQtODBiNi00OGY5LTk4NGUtNjdmNzJmOTMwZDcwOmpYQXN5MFc0aGFIMkNqSDJRMWpZQloxNDVmVVJtanJQ',
    'User-Agent' : 'PNMB test-app/v1.0'
  }

  axios({url : 'https://netverify.com/api/v4/initiate', method : 'POST',
  data : JSON.stringify(payload), responseType : 'json', 
  headers: headers})
  .then((result) => {
    res.json(result.data);
  }).catch((err) => {
    console.log(err);
  });
})

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/'}
  );
});
  
const port = process.env.PORT || 5000;
app.listen(port);