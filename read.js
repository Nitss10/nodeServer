// const fs = require('fs');
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: fs.createReadStream('uploaded.TXT'),
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

//codes="c=$apple+$orange;console.log('another test');"
// const args = require('yargs').argv;
const fs = require('fs') 
function rep(var_obj,codes)
{
    const keys = Object.keys(var_obj);
    for (const key of keys) {
        // var regex=/\$(\w*)/;
        // var regex=new RegExp('\\$(\\'+key+'*)')
        var codes = codes.replace(key, int(var_obj[key]));
        // codes='c'+args.apple+'+'+args.orange+';console.log("another test");'

      }
    
    console.log('codes is',codes); 
    return codes;
    
}


function Parser(codes, name,var_obj,filename){
    switch(name)
    {
    case 'javascript':
        fs.createReadStream(filename).pipe(fs.createWriteStream('temp'+filename+'.js'));
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
        fs.createReadStream(filename).pipe(fs.createWriteStream('temp'+filename+'.py'));
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
        fs.createReadStream(filename).pipe(fs.createWriteStream('temp'+filename+'.php'));
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
    $apple: 28,
    $orange: 17,
    $pear: 54,
  })
