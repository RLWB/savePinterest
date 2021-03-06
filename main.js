const {app, BrowserWindow} = require('electron');
const fs = require('fs');
const {dialog} = require('electron');
const {shell} = require('electron');
const {globalShortcut} = require('electron');
let win;

function createWindow() {
    //监控刷新
    globalShortcut.register('f5', function() {
		console.log('f5 is pressed')
		win.reload()
	})
	globalShortcut.register('CommandOrControl+R', function() {
		console.log('CommandOrControl+R is pressed')
		win.reload()
    })
    
    win = new BrowserWindow({
        width: 800,
        height: 600,
        'web-preferences': {
            'web-security': false
        }
    });
    // win.loadURL('http://www.pinterest.com');
    win.loadFile('index.html');

    win.openDevTools();
    win.on('closed', () => {
        win = null;
    });
}
function readHosts() {
    let hosts = fs.readFile('/Windows/system32/drivers/etc/hosts', 'utf8', (err, res) => {
        if (err) throw err;
        dialog.showOpenDialog();
    });
}
app.on('ready', () => {
    createWindow();
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