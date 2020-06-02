// var express=require('express')
// var app=express()

// app.listen(3000,function(){
//     console.log('server running on port 3000')
// })

// app.get('/parser',Parser("\$apple=3;console.log('another test');",'javacodes',{
//     apple: 28,
//     orange: 17,
//     pear: 54,
//   }));

//codes="c=$apple+$orange;console.log('another test');"
const args = require('yargs').argv;

function rep(var_obj,codes)
{
    const keys = Object.keys(var_obj);
    for (const key of keys) {
        // var regex=/\$(\w*)/;
        var regex=new RegExp('\\$(\\'+key+'*)')
        var codes = codes.replace(regex, "args."+key);
        codes='c'+args.apple+'+'+args.orange+';console.log("another test");'

      }
    
    console.log('codes is',codes); 
    return codes;
    
}


const fs = require('fs') 

function Parser(codes, name,var_obj){
    switch(name)
    {
    case 'javascript':
        if(codes.includes('require') || codes.includes('import') || codes.includes('export') || codes.includes('process'))
            throw new Error(' contains invalid statements')
        else
        {   
            console.log('javascript');
            codes=rep(var_obj,codes);
            fs.writeFile('output1.js', codes, (err) => {
                if (err) throw err;
                console.log('file saved!');
            });
            
        break;
        }
    
    case 'python':
        if(codes.includes('import') || codes.includes('sys'))
            throw new Error(' contains invalid statements')
            else
            {   
                console.log('python');
                codes=rep(var_obj,codes);
                fs.writeFile('output.py', codes, (err) => {
                    if (err) throw err;
                    console.log('file saved!');
                });
                
            break;
            }

    case 'PHP':
        if(codes.includes('include') || codes.includes('require') || codes.includes('require_once'))
            throw new Error(' contains invalid statements')
            else
            {   
                console.log('php');
                codes=rep(var_obj,codes);
                fs.writeFile('output.php', codes, (err) => {
                    if (err) throw err;
                    console.log('file saved!');
                });
                
            break;
            }
    }

    // const args = require('yargs').argv;
        }

Parser("$apple+$orange=4;console.log('another test');",'javascript',{
    apple: 28,
    orange: 17,
    pear: 54,
  })



// const fs = require('fs');
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: fs.createReadStream('hello1.js'),
//   crlfDelay: Infinity
// });
// rl.on('line', (line) => {
//   if(line.includes('require('))
//    throw new Error ('contains require statements')
//   else
//    console.log(`Line from file: ${line}`);
// });

// if (require.main === module) {
//     console.log('called directly');
// } else {
//     console.log('required as a module');
// }