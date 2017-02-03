const DEBUG = true;
if( DEBUG ) var debug = console.log.bind(window.console);
else var debug = function(){};

var serialport = require('serialport');
const SerialPort = serialport;
const {dialog,Menu} = require('electron').remote;
var lines = [];





const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open',
                click: () => {
                    openFile();
                }
            }, {
                label: 'Quit',
                click: () => {
                    app.quit();
                }
            }
        ]
    }
];
const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);










const fs = require('fs');


var port = new SerialPort("COM4", {
    baudRate: 9600,
    parser: SerialPort.parsers.readline("\r\n")
});

function sendSerial() {
    var str = document.getElementById("input").value;
    if (port.isReady) {
        port.write(str);
    } else {
        alert("Serial not ready");
    }
}

port.isReady = false;

port.on('data', (data) => {
    if (data == "begin#") {
        port.isReady = true;
        dbmsg("Arduino started");
    }
    dbdata(data);
});

port.on('error',  (err) => {
    dbmsg('Error: ', err.message);
});

function openFile() {
    dialog.showOpenDialog(function (fileNames) {
        if (fileNames === undefined) return;
        var fileName = fileNames[0];

        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) throw err;
            console.log(data);
            lines = data.split("\n");
        });

    });

}
