const express = require('express');
const bodyParser = require('body-parser');
const exec = require("child_process").exec; 
var fs = require('fs'); 

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.raw());

app.post('/makefile',(req,res) => {
  var text=req.body.text;
  var filename=req.body.filename;
//   var type=req.body.name;
  fs.writeFile(filename,text, (err) => {
    if (err) throw err;
    res.send({status:'success'})
    console.log('file saved!');
})
});
app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));