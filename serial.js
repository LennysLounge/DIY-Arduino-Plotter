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

var port = new SerialPort("COM4", {
    baudRate: 9600,
    parser: SerialPort.parsers.readline("\r\n")
});
function sendSerial(){
    var str = document.getElementById("input").value;
    if(port.isReady){
        port.write(str);
    }else{
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