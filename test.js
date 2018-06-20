const fs = require('fs');
console.log(fs)
let hosts = fs.readFile('/Windows/system32/drivers/etc/hosts', (err, res) => {
    if (err) throw err;
    fs.writeFile('/Users/Administrator/Desktop/hosts', res, (err) => {
        if(err) throw err;
        console.log('It\'s saved!');
    })
});