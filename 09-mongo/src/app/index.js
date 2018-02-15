var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017'
MongoClient.connect(url, function(err, client) {
    if (err) {
        throw new Error('The world is destroyed')
    }

    var db = client.db('juodrastis')
    var collection = db.collection('values')

    collection.save({ value: 'foo' })
        .then(function() {
            console.log('saved')
        })
})


