const express = require('express');
const bodyParser = require('body-parser');
const exec = require("child_process").exec; 
var fs = require('fs'); 

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.raw());

app.get('/',(req,res)=>{
res.send('hello world');
})

app.post('/parser', (req, res) => {
    var name=req.body.name;
    var var_obj=req.body.var_obj;
    var codes=req.body.text;
    var ext;
    switch(name)
    {
        case 'python':
            ext='py'
            break;
        case 'node':
                ext='js';
                break;
        case 'php':
            ext='php';
            break;
    }
    var filename='temp.'+ext;
    console.log('Got body:', req.body);
    Parser(name,codes,var_obj,filename);
    // res.sendStatus(200);
    cmd = name + ' ' +filename   //command to run script
    exec(cmd,{timeout:5000, maxBuffer:1024*5},(error, stdout, stderr) => {
        
        // fs.unlink('temp'+filename, function(err) {
        //     if (err) {
        //       throw err
        //     } else {
        //       console.log("Successfully deleted the file.")
        //     }
        // })
        if (stderr) res.send({status:'fail', error:stderr})
        res.send({status:'success', output:JSON.parse(stdout)})
    })
    // JSON.parse(stdout)    
});


// app.get('/list',(req,res)=>{
//     exec("echo ls", (error, stdout, stderr) => {
//         if (stderr) res.send({status:'fail', error:stderr})
//         res.send({status:'success', output:stdout})
//     })
// })



function Parser(name,codes,var_obj,filename){
    switch(name)
    {
    case 'node':
        // fs.readFile(filename,'utf8', (err, codes) => { 
            // console.log(codes);
        if(codes.includes('require') || codes.includes('import') || codes.includes('export') || codes.includes('process')|| codes.includes('process') || codes.includes('document.write')||codes.includes('console.log'))
            throw new Error(' contains invalid statements')
        else
        {   
            console.log('javascript');
            var keys = Object.keys(var_obj);
            for (var key of keys) {
                var regex=new RegExp('(\\'+key+'*)','g');
            
                codes = codes.replace(regex, var_obj[key]);
            }
            codes=codes.trim();
            console.log(codes);

            var imports1= `require('underscore');\nconst { sqrt } = require('mathjs')\n`;
            codes=imports1+codes;

            var lastline;
            if(codes.lastIndexOf("\n")>0) {
                lastline=codes.substring(codes.lastIndexOf("\n")+1);
                console.log('lastline',lastline);
                if(!(lastline.includes("console.log(")))
                {
                    codes=codes.substring(0, codes.lastIndexOf("\n"));
                    codes=codes+"\nconsole.log("+lastline+")";
                    
                }
            } 
            console.log(codes);
            fs.writeFile(filename,codes, (err) => {
                if (err) throw err;
                console.log('file saved!');
            });
            
         }
        // })
          
        break;
        
    
    case 'python':
        // fs.readFile(filename,'utf8', (err, codes) => { 
            // console.log(codes);
            if(codes.includes('import') || codes.includes('sys')||codes.includes('open')||codes.includes('.read')||codes.includes('.write')||codes.includes('.close')||codes.includes('compile()'||codes.includes('input()'))|| codes.includes('detach()')|| codes.includes('fileno()')|| codes.includes('flush()')|| codes.includes('isatty()')|| codes.includes('readable()')|| codes.includes('readline()')|| codes.includes('readlines()')|| codes.includes('seek')|| codes.includes('seekable')|| codes.includes('tell()')|| codes.includes('truncate()')|| codes.includes('writeable()')|| codes.includes('write')|| codes.includes('writelines()')|| codes.includes('print('))
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
                codes=codes.trim();
                console.log(codes);
                
                var imports2='import json'+'\r\n'+'import datetime'+'\r\n'+'import math'+'\r\n'+'import re'+'\r\n'+'import collections'+'\r\n'
                codes=imports2+codes;

                var lastline;
                if(codes.lastIndexOf("\r\n")>0) {
                    lastline=codes.substring(codes.lastIndexOf("\r\n")+2);
                    console.log(lastline);
                    if(!(lastline.startsWith("print(")))
                  {
                    codes=codes.substring(0, codes.lastIndexOf("\r\n"));
                    codes=codes+"\r\nprint("+lastline+")";
                  }
    
                } 
                console.log(codes);
              
                fs.writeFile(filename, imports2+codes, (err) => {
                    if (err) throw err;
                    console.log('file saved!');
                });
             
             }
            // })
              
            break;

    case 'php':
        // fs.readFile(filename,'utf8', (err, codes) => { 
                // console.log(codes);
        if(codes.includes('include') || codes.includes('require') || codes.includes('require_once')|| codes.includes('echo('))
            throw new Error(' contains invalid statements')
        else
            {   
                console.log('php');
                var keys = Object.keys(var_obj);
                var result;
                for (var key of keys) {
                    var regex=new RegExp('(\\'+key+'*)','g');
                
                    codes = codes.replace(regex, var_obj[key]);
                }
                codes=codes.trim();
                console.log(codes);
                var lastline;
                if(codes.lastIndexOf("\r\n")>0) {
                    lastline=codes.substring(codes.lastIndexOf("\r\n")+2);
                    console.log(lastline);
                    if(!(lastline.startsWith("echo ")))
                    {
                      codes=codes.substring(0, codes.lastIndexOf("\r\n"));
                      codes=codes+"\r\necho "+lastline;
                    }
            
                } 
                console.log(codes);
                fs.writeFile(filename, codes, (err) => {
                    if (err) throw err;
                    console.log('file saved!');
                });
             }
            // })
              
            break;
    }

        }


// app.use(bodyParser.raw());

app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));
