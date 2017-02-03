
const DEBUG = true;
function dbmsg(str) {
    if (DEBUG) {
        console.log(str);
    }
}
function dbdata(str) {
    if (DEBUG) {
        console.dir(str);
    }
}
const electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
const {app} = electron;
app.on('ready', function(){
    var mainWindow = new BrowserWindow({
        width:800,
        height:600
    });
    mainWindow.loadURL('file://'+ __dirname +"/index.html");
});

var lines = [];

const fs = require('fs');

/*
SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});

fs.readFile('test_0001', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
  lines = data.split("\n");
});
*/