const {app, BrowserWindow} = require('electron');
const fs = require('fs');
const {dialog} = require('electron');
const {shell} = require('electron');
console.log(dialog)
let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        'web-preferences': {
            'web-security': false
        }
    });
    // win.loadURL('http://www.pinterest.com');
    win.loadFile('index.html')

    win.on('closed', () => {
        win = null;
    });
}
function readHosts() {
    let hosts = fs.readFile('/Windows/system32/drivers/etc/hosts', (err, res) => {
        if (err) throw err;
        dialog.showOpenDialog();
    });
}
app.on('ready', () => {
    createWindow();
    shell.openExternal('https://github.com')
});


app.on('wondow-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if(win == null) {
        createWindow();
    }
})