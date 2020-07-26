var express = require('express');
var router = express.Router();
var io = require("socket.io")(100);
const fs = require("fs");
const { EventEmitter } = require('events');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('blog');
});



router.post('/', function(req, res, next) {
  var blog_title = req.body.blogName
  res.render('blog',{blogtitle:blog_title, moodType:"calm"});
});

io.on('connection',(socket)=>{
  console.log('connected to blog')
  socket.on('save-change',json=>{
    let title = json[0]+".json"
    let raw_json = json[1]
    writeJSON(title, raw_json)
  })
  socket.on('send-name',(name)=>{
    json = JSON.stringify(readJSON(name+'.json'));
    socket.emit('send-cells',json);
  });


});


function readJSON(filename){
  let obj;
  fs.readFile('jsons/'+filename, 'utf8', (err, data)=>{
    if (err) throw err;
    obj = JSON.parse(data);
  })
  return obj;
}

function writeJSON(filename,json){
  fs.writeFile('jsons/'+filename, JSON.stringify(json),err =>{
    if(err) throw err;
    console.log("DOne");
  })
}


module.exports = router;
