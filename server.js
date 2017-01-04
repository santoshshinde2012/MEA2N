var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    index = require('./routes/index'),
    tasks = require('./routes/tasks'),
    port = 8080,
    app = express();

    //view engine

    app.set('views',path.join(__dirname,'views'));
    app.set('view engine','ejs');
    app.engine('html',require('ejs').renderFile);

    //set static folder

    app.use(express.static(path.join(__dirname,'client')));

    //body parser

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));

    app.use('/',index);
    app.use('/api',tasks);

    app.listen(port, function(){
      console.log('server started at port '+port);
    });
