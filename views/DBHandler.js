var low = require('lowdb');
var db = low('.data/db.json', { storage: require('lowdb/lib/storages/file-async') });

db.defaults({id: 0, data : []}).write();

// We keep a max of 20 latest records in the db
var maxRecords = 20;
function putEntry(entry){
  var index = db.get('id').value();
  db.set('data['+index+']', {'term': entry, 'when': new Date().toLocaleString()}).write();
  index = (index + 1) % maxRecords;
  db.set('id', index).write();
  //db.get('data').unshift({'term': entry, 'when': new Date().toLocaleString()}).write();
}

function getEntries(num = 20){
  var entries = db.get('data').value();
  var len = entries.length;
  num = len > num ? num : len;
  console.log(process.env.CSE_ID+" :  "+process.env.API_KEY);
  return entries.slice(0, num);
}

exports.putEntry = putEntry;
exports.getEntries = getEntries;