const {app,BrowserWindow,Menu} = require('electron');

let win;

app.on('ready', () => {
    win = new BrowserWindow({width:800,height:600});
    win.loadURL('file://'+ __dirname +"/resources/index.html");
    var option = {"mode":"undocked"};
	win.webContents.openDevTools(option);
	win.setMenu(null);
});