var db = require('./views/DBHandler');
var search = require('./views/webResults');
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/search/:query", function (req, res) {
  //res.sendFile(__dirname + '/views/index.html');
  var query = req.params.query;
  var offset = req.query.offset;
  db.putEntry(query);  
  search.results(query, offset, res);
});

app.get('/latest', (req, res) => {
  var data = db.getEntries();
  res.send(data);
});

app.get('/', function(req, res){
  res.sendFile(__dirname+'/views/index.html');
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
