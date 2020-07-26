var express = require('express');
var router = express.Router();
var io = require("socket.io")(200);
const fs = require('fs');

router.get('/', (req, res)=>{
    res.render('index');
});
var blogs = [];
io.on('connection',(socket)=>{
    console.log('connected to index')
    
    socket.on('imConnected',()=>{
        
        fs.readdir(
            'jsons', (err, files) => {
            files.forEach(file => {
                
                blogs.push(String(file))
            });
            socket.emit('send-blog',blogs);
            console.log(blogs);
        });
        
        
        blogs = [];    
    });
    
    
  });



module.exports = router;
