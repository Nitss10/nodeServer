
var fs = require('fs'); 

fs.readFile('uploaded.txt', 'utf8', function(err, data){ 
    const fruits = {
        $apple: "'niti'",
        $orange: 17,
        pear: 54,
      }
    // var codes;
    console.log(data);
    const keys = Object.keys(fruits);
    for (const key of keys) {
        console.log(key);
        // console.log(fruits[keyy]);
        // var regex=new RegExp('\\$(\\'+key+'*)')
        const replacer = new RegExp(keyy, 'g');
        var result= data.replace(replacer,'nitss');
      }
      console.log(result);
     
   
    // data=rep(fruits,data);

}); 

console.log('readFile called'); 












// const fs = require('fs');
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: fs.createReadStream('uploaded.TXT'),
//   crlfDelay: Infinity
// });
// console.log(typeof r1)
// rl.on('line', (line) => {
//   const keys = Object.keys(var_obj);
//   for (const key of keys) {
//   if(line.includes(key)
//    var line = line.replace(key, var_obj[key]);
//   }
// //   else
// //    console.log(`Line from file: ${line}`);
// });
