const DEBUG = true;
var nextLetter ="!";
var dbmsg = function() {};
var dbdata = function() {};
if (DEBUG) {
    dbmsg = console.log.bind(window.console);
    dbdata = console.dir.bind(window.console);
}
const Port = require('./port.js');
//var PortNames = Port.show();
var setPort;
var currentLine;
var lastSendLine;
var PortReady = false;
window.onload = () => {
    if (PortNames = Port.show()) {
        console.dir(PortNames);
        var COM = PortNames[0];
    }
}

function sendNextLine() {
    if (currentLine < lines.length) {
        GCODEviewer.update(currentLine);
        setPort.write(lines[currentLine].line.replace("\r", "") + "\n" );
        lastSendLine = currentLine;
        currentLine += lines[currentLine].next;
        return true;
    } else {
        return false;
    }
}

function startReading() {
    setPort.on('data', (data) => {
        if (data == "Fbegin#" || data == "#begin#") {
            //console.log(true);
            document.getElementById("btn_SendData").disabled = false;
            PortReady = true;
        }else if (data == nextLetter) {
            if (!sendNextLine()) {
                document.getElementById("btn_SendData").disabled = false;
            }
        }else if(data != nextLetter){
            console.log(lastSendLine);
            currentLine = lastSendLine;
            //sendNextLine();
        }
        dbdata(data);
    });

    setPort.on('error', (err) => {
        dbmsg('Error: ', err.message);
    });
}
