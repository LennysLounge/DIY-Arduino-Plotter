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

var serialport = require('serialport');
const SerialPort = serialport;
const {dialog} = require('electron').remote;
var lines = [];

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

port.on('data', function (data) {
    if (data == "begin#") {
        port.isReady = true;
        dbmsg("Arduino started");
    }
    dbdata(data);
});

port.on('error', function (err) {
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
