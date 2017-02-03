const {app,BrowserWindow,Menu} = require('electron');

let win;

app.on('ready', () => {
    win = new BrowserWindow({width:800,height:600});
    win.loadURL('file://'+ __dirname +"/index.html");
    var option = {"mode":"undocked"};
	win.webContents.openDevTools(option);
});


/*
SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});

*/