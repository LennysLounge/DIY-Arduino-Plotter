const SerialPort = require('serialport');

module.exports = {
    open: (portName) => {
        var port = new SerialPort(portName, {
            baudRate: 9600,
            parser: SerialPort.parsers.readline("\r\n")
        });
        return port;
    },
    show: () => {
        var comNames = [];
        SerialPort.list((err, ports) => {
            ports.forEach(function(port) {
                comNames.push(port.comName);
                document.getElementById("COMports").innerHTML += "<option>" + port.comName + "</option>";
            });
        });
        return comNames;
    }
};
