var express = require('express'),
    router = express.Router(),
    mongojs = require("mongojs"),
    db = mongojs("mongodb://user:user@ds149998.mlab.com:49998/tasklist",['task'])

   //get the all task
    router.get('/tasks',function(req,res,next){
      db.task.find(function(err,tasks){
        if(err){
          res.send(err);
        }
        res.json(tasks);
      })
    });

    //get the single task
    router.get('/tasks/:id',function(req,res,next){
      db.task.findOne({_id: mongojs.ObjectId(req.params.id)},function(err,task){
        if(err){
          res.send(err);
        }
        res.json(task);
      })
    });

    //save the task
    router.post('/task',function(req,res,next){
       var task = req.body;
       if(!task.title){
         res.status(400);
         res.json({"error":"post bad data","req":req});
       }else{
         db.task.save(task,function(err,task){
           if(err){
             res.send(err);
           }
           res.json(task);
         })
       }
    });

     //delete task
     router.delete('/delete/:id',function(req,res,next){
       db.task.remove({_id: mongojs.ObjectId(req.params.id)},function(err,task){
         if(err){
           res.send(err);
         }
         res.json(task);
       })
     });

     //update task
     router.put('/update/:id',function(req,res,next){
        var task = req.body;
        if(!task.title){
          res.status(400);
          res.json({"error":"post bad data"});
        }else{
          db.task.update({_id: mongojs.ObjectId(req.params.id)},task,{},function(err,task){
            if(err){
              res.send(err);
            }
            res.json(task);
          })
        }
     });

    module.exports = router;
