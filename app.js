// --- LOADING MODULES
var express = require('express'),
    body_parser = require('body-parser'),
    redis = require('redis'),
    rejson = require('redis-json')

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

    var client = redis.createClient(process.env.REDIS_URL)
    client.on('connect', function() {
	console.log('connected');
    });

    var data = request.body

    console.log(data)

    response.end("")
   
})


