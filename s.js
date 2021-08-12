var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open',function(){
    console.log('connection has been made');
}).on('error',function(error){
    console.log('error is:',error)
})
const router = express.Router();
router.get("/new_user",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var amount = req.body.amount;

    var data = {
        "name": name,
        "email" : email,
        "username": username,
        "amount" : amount
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('form.html')

})


router.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
})

var http = require('http');
var clientHtml = require('fs').readFileSync('main.html');
//const staticPath=path.join(__dirname,"/nodeJS");

var plainHttpServer = http.createServer(function (request, response) {
response.writeHead(200, { 'Content-Type': 'text/html' });
response.end(clientHtml);
}).listen(3000);

var files = require('fs');
const io = require('socket.io')(plainHttpServer);




