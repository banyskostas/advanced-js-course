var MongoClient = require('mongodb').MongoClient
var restify = require('restify')

var url = 'mongodb://localhost:27017'

var collections = {
    values: {
        id: 'values'
    },
    users: {
        id: 'users'
        //...
    }
};

function connect(callback) {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var dbo = client.db("juodrastis");
        callback(dbo, client);
    })
}

function add(obj, collection) {
   connect(function(dbo, client) {
       dbo.collection(collection).insertOne(obj, function(err, res) {
           if (err) throw err;
           console.log("1 document inserted");
           client.close();
       });
   });
}

function get(collection, callback) {
    connect(function(dbo, client) {
        dbo.collection(collection).find({}).toArray(function(err, result) {
            if (err) throw err;
            client.close();
            callback(result);
        });
    });
}

var server = restify.createServer();
server.use(restify.plugins.bodyParser())

server.use(function slowHandler(req, res, next) {
    var header=req.headers['authorization']||'',        // get the header
        token=header.split(/\s+/).pop()||'',            // and the encoded auth token
        auth=new Buffer(token, 'base64').toString(),    // convert from base64
        parts=auth.split(/:/),                          // split on colon
        username=parts[0],
        password=parts[1];

    console.log(username, password);
    if (username !== 'hello' || password !== 'world' ) {
        res.writeHead(401, {});
        res.end();
    }
    next();
});

server.get('/values', function(req, resp, next) {
    get(collections.values.id, function(data) {
        resp.send(data)
        next()
    });

})

server.post('/values', function(req, resp, next) {
    let body = req.body;
    let counter = 0;

    //console.log(body);

    try {
        for (let i = 0; i < body.length; i++) {
            add(body[i], collections.values.id);
            counter++;
        }
    } catch (err) {
        console.log(err);
    }

    // var login = req.params.login
    // var user = req.body
    // user.login = login
    // users.push(user)
    resp.end('Items inserted: ' + counter)
    next()
})

server.listen(8080, function() {
    console.log('Listening on 8080')
})



