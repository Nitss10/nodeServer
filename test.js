
var express = require('express'); 
var app = express(); 
app.listen(3000, function() { 
    console.log('server running on port 3000'); 
} ) 

app.get('/name', callName); 

function callName(req, res) { 
    var spawn = require("child_process").spawn; 
    // E.g :     
    // so, first name = Mike and last name = Will 
    var process = spawn('node',["./anotherTest.js", 
                            req.query.firstname, 
                            req.query.lastname] ); 
    process.stdout.on('data', function(data) { 
        res.send(data.toString()); 
    } ) 
    process.stderr.on('data',stderr =>{
        console.log(stderr.toString());
    })
} 



// const exec=require('child_process').exec;
// const child = exec('node anotherTest.js',
//     (error, stdout, stderr) => {
//         console.log(`stdout: ${stdout}`);
//         console.log(`stderr: ${stderr}`);
//         if (error !== null) {
//             console.log(`exec error: ${error}`);
//         }
// });




