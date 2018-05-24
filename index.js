const express = require('express')
const app = express()
const ObjectID = require('mongodb').ObjectID;


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.listen(3000, () => console.log('Example app listening on port 3000!'))

//Static files in public folder
app.use(express.static('public'))


//parsing in variables into handlebars
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

let context = {'title': 'To Do List', 'body':'My context body'}
app.get('/', (req, res) => res.render('home', {data: context, showStatus:true}))


//***************************************************
// Mongo database connection

//mongoDB connection
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/toDoList'


//***************************************************
// Routes and callbacks for API

//GET = Retrieve all items
app.get('/api/toDos', function (req, res) {

    var getDataFromDB = function(db) {
        db.collection('list').find({}).toArray(function(err, docs) {
            // res.json(docs)
            if (err) {
                return res.status(500).send({'success':false,
                    'msg':'Error on DB query',
                    'data':[]})
            }
            res.json({'success':true,
                    'msg':'returned all items',
                    'data':docs})
        })
    }

    MongoClient.connect(url, function(err, client) {
        let db = client.db('toDoList')
        getDataFromDB(db)
    })

})

//POST a Single new item
app.post('/api/toDos', function (req, res) {

    var insertIntoDB = function(db, newItem, deletedFlag, completedFlag) {

            db.collection('list').insertOne(
                {
                    description : newItem,
                    deleted : deletedFlag,
                    completed : completedFlag,
                },
                function(err, result){
                    if(err) {
                        return res.status(500).send({'success':false,
                            'msg':'Error with adding item',
                            'data':[]})
                    } else {
                        res.status(200).json({'success':true,
                            'msg':'Single item added',
                            'data':[]})
                    }
                })
    }

    let newItem = req.body.description
    let deletedFlag = req.body.deleted
    let completedFlag = req.body.completed

    MongoClient.connect(url, function(err, client) {
        let db = client.db('toDoList')
        insertIntoDB(db, newItem, deletedFlag, completedFlag)
    })

})


//PUT - updates a single item (based on Mongo DB _id)
app.put('/api/toDo', function (req, res) {

    var updateDataInDB = function(db, id, description, deletedFlag, completedFlag) {

        db.collection('list').updateOne(
            { _id : ObjectID(id)},
            {$set:
                {
                description : description,
                deleted : deletedFlag,
                completed : completedFlag,
                }
            },
            function(err, result){
                if(err){
                    return res.status(500).send({'success':false,
                        'msg':'Error with update',
                        'data':[]})
                } else {
                    res.status(200).json({'success':true,
                        'msg':'Single item updated',
                        'data':[]})
                }
            }
        )}

    let id = req.body.id
    let newItem = req.body.description
    let deletedFlag = req.body.deleted
    let completedFlag = req.body.completed

    MongoClient.connect(url, function(err, client) {
        let db = client.db('toDoList')
        updateDataInDB(db, id, newItem, deletedFlag, completedFlag)
    })

})

//DELETE - updates the delete flag for a single item (based on Mongo DB _id)
app.delete('/api/toDo', function (req, res) {

    var deleteDataInDB = function(db, id) {
        var ObjectID = require('mongodb').ObjectID;
        db.collection('list').updateOne(
            { _id : ObjectID(id)},
            {$set: {deleted : 1}},
            function(err, result){
                res.json(result)
            }
        )}

    let id = req.body.id

    MongoClient.connect(url, function(err, client) {
        let db = client.db('toDoList')
        deleteDataInDB(db, id)
    })

})
