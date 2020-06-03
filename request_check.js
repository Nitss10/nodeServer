const express = require('express');
const bodyParser = require('body-parser');
const exec = require("child_process").exec; 

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.raw());
app.post('/parser', (req, res) => {
    var name=req.body.name;
    var var_obj=req.body.var_obj;
    var filename=req.body.filename;

    console.log('Got body:', req.body);
    Parser(name,var_obj,filename);
    // res.sendStatus(200);
    cmd = name + ' ' + 'temp'+filename   //command to run script

    exec(cmd, (error, stdout, stderr) => {
        if (stderr) res.send({status:'fail', error:stderr})
        res.send({status:'success', output:stdout})
    })
   
});


// app.get('/list',(req,res)=>{
//     exec("echo ls", (error, stdout, stderr) => {
//         if (stderr) res.send({status:'fail', error:stderr})
//         res.send({status:'success', output:stdout})
//     })
// })

var fs = require('fs'); 

function Parser(name,var_obj,filename){
    switch(name)
    {
    case 'node':
        fs.readFile(filename,'utf8', (err, codes) => { 
            // console.log(codes);
        if(codes.includes('require') || codes.includes('import') || codes.includes('export') || codes.includes('process'))
            throw new Error(' contains invalid statements')
        else
        {   
            console.log('javascript');
            var keys = Object.keys(var_obj);
            var result;
            for (var key of keys) {
                var regex=new RegExp('(\\'+key+'*)','g');
            
                codes = codes.replace(regex, var_obj[key]);
            }
            fs.writeFile('temp'+filename, codes, (err) => {
                if (err) throw err;
                console.log('file saved!');
            });
            
         }})
          
        break;
        
    
    case 'python':
        fs.readFile(filename,'utf8', (err, codes) => { 
            // console.log(codes);
        if(codes.includes('import') || codes.includes('sys'))
            throw new Error(' contains invalid statements')
        else
            {   
                console.log('python');
                var keys = Object.keys(var_obj);
                var result;
                for (var key of keys) {
                    var regex=new RegExp('(\\'+key+'*)','g');
                
                    codes = codes.replace(regex, var_obj[key]);
                }
                fs.writeFile('temp'+filename, codes, (err) => {
                    if (err) throw err;
                    console.log('file saved!');
                });

             }})
              
            break;

    case 'php':
        fs.readFile(filename,'utf8', (err, codes) => { 
                // console.log(codes);
        if(codes.includes('include') || codes.includes('require') || codes.includes('require_once'))
            throw new Error(' contains invalid statements')
        else
            {   
                console.log('python');
                var keys = Object.keys(var_obj);
                var result;
                for (var key of keys) {
                    var regex=new RegExp('(\\'+key+'*)','g');
                
                    codes = codes.replace(regex, var_obj[key]);
                }
                fs.writeFile('temp'+filename, codes, (err) => {
                    if (err) throw err;
                    console.log('file saved!');
                });
             }})
              
            break;
    }

        }


// app.use(bodyParser.raw());

app.listen(8080, () => console.log(`Started server at http://localhost:8080`));
