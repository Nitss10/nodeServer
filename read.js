
var fs = require('fs'); 

function Parser(name,var_obj,filename){
    switch(name)
    {
    case 'javascript':
        fs.readFile(filename,'utf8', (err, codes) => { 
            console.log(codes);
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
            console.log(codes);
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

    case 'PHP':
        fs.readFile(filename,'utf8', (err, codes) => { 
                console.log(codes);
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

Parser('javascript',{
    $apple: 2,
    $orange:13,
    $pear: 54,
  },'abc.js')


//   "console.log($apple+$orange+$apple);",
