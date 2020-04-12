const fs = require('fs');


fs.appendFileSync('ids.csv', `skuid`);
for(var i = 9000000; i <= 10000000; i++){
    try{
        fs.appendFileSync('ids.csv', `${i}\n`);  
      } catch(err){
        console.log(err);
      }
}