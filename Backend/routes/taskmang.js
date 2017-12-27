var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

/* POST Task Data. */
router.post('/addtask', function(req, res, next) {
  var taskName = req.body.taskName;
  var taskDescription = req.body.taskDescription;
  var taskcreatedby=req.body.taskcreatedby;
  var taskdate=req.body.taskdate;
  var taskstarttdate=req.body.taskstarttdate;

  var today = Date.now();
  console.log("date",today);

  console.log('Task Name: '+taskName+' Task Description: '+taskDescription);
  MongoClient.connect("mongodb://localhost:27017/TaskDB",  function (err, db) {
    if(err) throw err;
    db.collection('TaskCollection', function (err, collection) {
       collection.insert({ taskName: taskName, taskDescription: taskDescription,taskstarttdate:taskstarttdate,taskcreatedby:taskcreatedby,taskdate:taskdate,createdDate:today});
     });
  });
  res.send(JSON.stringify(req.body));
});






/* update Task Data. */
router.put('/updatetask', function(req, res, next) {
console.log("boday data=", req.body);
  var id=req.body._id;
   var taskName = req.body.taskName;
   var taskDescription = req.body.taskDescription;
   var taskcreatedby=req.body.taskcreatedby;
   var taskdate= req.body.taskdate;
   var taskstarttdate=req.body.taskstarttdate;

MongoClient.connect("mongodb://localhost:27017/TaskDB",  function (err, db) {

  if(err)throw err;
  db.collection('TaskCollection', function (err, collection) {


        collection.update({_id:new ObjectId(id)},{$set :{taskdate:taskdate,taskDescription:taskDescription,taskstarttdate:taskstarttdate,taskName:taskName,taskcreatedby:taskcreatedby}},{w:1},function(err, savedtasks)
        {
          if(err){
              console.log(err);
          }

          else {
            console.log("Save n updated"+savedtasks);
              res.send(JSON.stringify(req.body));
          }
        });
     });

   });

});



<!--delte-->
router.put('/deletetask', function(req, res, next) {

  console.log("boday data=", req.body);
    var id=req.body._id;

MongoClient.connect("mongodb://localhost:27017/TaskDB",  function (err, db) {

if(err)throw err;
db.collection('TaskCollection', function (err, collection) {


  collection.remove({_id:new ObjectId(id)}, {w:1},  function(err, result) {
    if(err) throw err;
    console.log('Document Removed Successfully');
      res.send(JSON.stringify(req.body));
   });
});
});
});



/* GET Task Data. */
router.get('/viewtask', function(req, res, next) {
  MongoClient.connect("mongodb://localhost:27017/TaskDB",  function (err, db) {
    if(err) throw err;
     db.collection('TaskCollection', function (err, collection) {
       collection.find().toArray(function(err, items) {
          if(err) throw err;
          res.send(items);
        });
      });
  });
});


router.get('/search', function(req, res, next) {
  console.log("search api",req.query.search);
  var value=req.query.search;
  console.log(value);
  if(value=="")
  {
    console.log("value nathi");
    res.send(value);
  }
  else{


  MongoClient.connect("mongodb://localhost:27017/TaskDB",  function (err, db) {
    if(err) throw err;
     db.collection('TaskCollection', function (err, collection) {
       collection.find({taskName: new RegExp(value,'i')}).toArray(function(err, items) {
         console.log("result of search:",items);
          if(err) throw err;
          res.send(items);
        });
      });
  });
}



});



module.exports = router;
