// --- LOADING MODULES
var express = require('express'),
    body_parser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient;

// --- INSTANTIATE THE APP
var app = express();

// --- STATIC MIDDLEWARE 
app.use(express.static(__dirname + '/public'));
app.use('/jsPsych', express.static(__dirname + "/jsPsych"));
app.use('/experiment-data', express.static(__dirname + "/experiment-data"));
app.use(body_parser.json());

// --- VIEW LOCATION, SET UP SERVING STATIC HTML
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// --- ROUTING
app.get('/', function(request, response) {
    response.render('index.html');
});

// --- START THE SERVER 
var server = app.listen(process.env.PORT, function(){
    console.log("Listening on port %d", server.address().port);
});

// --- POST

app.post('/experiment-data', function(request, response) {

    var username = process.env.ORMONGO_USER;
    var password = process.env.ORMONGO_PASS;
    var hosts = 'iad2-c12-1.mongo.objectrocket.com:52499,iad2-c12-2.mongo.objectrocket.com:52499,iad2-c12-0.mongo.objectrocket.com:52499';
    var database = 'experiment1-jason';
    var options = '?replicaSet=18d6e0cdbb894d2293da62eaab115acd';
    var connectionString = 'mongodb://' + username + ':' + password + '@' + hosts + '/' + database + options;

    var data = request.body

    console.log(data)

    /*
    response.end()
      MongoClient.connect(connectionString, function(err, db) {
    if (err) {
        console.log('Error: ', err);
	console.log(data)
    } else {
        console.log('Connected!');
	
	var collection = db.db('experiment1-json').collection("data");
	collection.insertMany(data, function(err, res) {

	    if (err) throw err;
	    console.log("Data inserted");
	    db.close();
	})
    }
    });

    response.end("")

*/
   
})


