const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('https');
var path = require('path');
var {User} = require('./model/user.js');
const _ = require('lodash');
const cors = require('cors');

mongoose.promise = global.promise;
mongoose.connect('mongodb://localhost:27017/test_app', { useNewUrlParser: true });


const port = process.env.PORT || 3001;
var app = express();
app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));
var publicPath = path.join(__dirname,'../public');

var  server = http.createServer(app);
app.use(express.static(publicPath));
app.use(express.json({limit:'1mb'}));
console.log(publicPath);
app.use(bodyParser.json());


app.post('/user', (req,res)=>{
  var body = _.pick(req.body,['firstName','lastName', 'email', 'password']);
  console.log(body);
  var NewUser = new User(body);
  NewUser.save().then((todos)=>{
    // return NewUser.generateAuthToken();
    console.log(todos);
    res.status(200).send({todos});
  }).catch((e) => {
    console.log("unsuccessful");
    res.status(400);
    res.send("post unsuccessful");
  });
});

app.get('/login/:email/:password',(req,res)=>{
    var email = req.params.email;
    var password = req.params.password;
    var body = {email, password};
  // var body = _.pick(req.body,['email', 'password']);
  User.find(body).then((todos)=>{
    if(todos.length ==0){
      res.status(400).send();
    }
    else {
      console.log(todos);
        res.status(200).send({todos});
        res.append('data', todos);
    }
  },(e)=>{
    res.status(400).send(e);
  });

});

app.get('/user/:id',(req,res)=>{
    var id = req.params.id;

  // var body = _.pick(req.body,['email', 'password']);
  User.findById(id).then((todos)=>{
    if(todos.length ==0){
      res.status(400).send();
    }
    else {
      console.log(todos);
        res.status(200).send({todos});
    }
  },(e)=>{
    res.status(400).send(e);
  });

});

app.put('/add',(req,res)=>{

  console.log(req.body);
  // console.log(req.body.incomelist);
  // console.log(req.body.expenselist);


  User.update({_id: req.body._id},{ taskList: req.body.taskList}).then(()=>console.log("succesfulll")).catch((e)=>{
    console.log("unsuccessfull");
  });


});

app.get('/forget/:email',(req,res)=>{
    var email = req.params.email;
    var body = {email};
  // var body = _.pick(req.body,['email', 'password']);
  User.find(body).then((todos)=>{
    if(todos.length ==0){
      res.status(400).send();
    }
    else {
      console.log(todos);
      var min = 100000;
      var max = 999999;
      var otp = Math.floor(Math.random() * (max - min + 1) ) + min;
        res.status(200).send({todos, otp});
    }
  },(e)=>{
    res.status(400).send(e);
  });

});



app.put('/reset',(req,res)=>{

  console.log(req.body);
  // console.log(req.body.incomelist);
  // console.log(req.body.expenselist);


  User.update({email: req.body.email},{password: req.body.password}).then(()=>{
    console.log("succesfulll");
    res.jsonp("successfully updated pass");
  }).catch((e)=>{
    console.log("unsuccessful");
  });

});

app.listen(port,()=>{
  console.log(`started at port 3001`);
});
