const request = require('request');

function results(query, offset, appResponse){
  query = encodeURI(query);
  request('https://pixabay.com/api/?key='+process.env.PIXABAY_KEY+'&q='+query+'&image_type=photo&pretty=true', function(err, res, body){
  if(!err && res.statusCode == 200){
    var results = JSON.parse(body).hits.slice(0, offset);
    var json = [];
    results.forEach(function(element){
      json.push({"Page-URL": element.pageURL, "Preview-URL": element.previewURL, "web-format-URL": element.webformatURL});
    });
    //console.log(json);
    appResponse.send(json);
  }
});
}

exports.results = results;