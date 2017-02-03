const DEBUG = true;
var dbmsg = function(){};
var dbdata = function(){};
if( DEBUG ){
     dbmsg = console.log.bind(window.console);
     dbdata = console.dir.bind(window.console);
}

var serialport = require('serialport');
const SerialPort = serialport;
const {dialog,Menu} = require('electron').remote;
var lines = [];
var linesToSend = [];
var currentLine = 0;

var GCODEviewer = new CODEviewer(document.getElementById("GCODEviewer"));






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
    },
    {
        label: 'Ports',
        submenu: [
            {
                label: 'Baud',
                click: () => {
                    openFile();
                }
            },
            {
                label:"Ports",
                submenu:[
                ],
            },
            {
                label: 'Quit',
                click: () => {
                    app.quit();
                }
            }
        ]
    }
];

SerialPort.list( (err,ports)=>{
    ports.forEach(function(port) {
        menuTemplate[1].submenu[1].submenu.push({label:port.comName});
    console.log(port.comName);
  });
  dbmsg("list");
  const menu = Menu.buildFromTemplate(menuTemplate);

Menu.setApplicationMenu(menu);
});

dbmsg(menuTemplate);
const menu = Menu.buildFromTemplate(menuTemplate);

Menu.setApplicationMenu(menu);
dbmsg("menu");



function CODEviewer( e ){
    this.lines = [];
    this.e = e;
    this.activeLine = 0;
    this.addLines = function ( lines ){
        this.lines = lines;
        this.build();
    }
    this.build = function (){
        this.lines.forEach(function(line) {
            this.e.innerHTML+="<p>"+line+"</p>";
        }, this);
    }
    this.update = function(activeLine){

    }
}







const fs = require('fs');


var port = new SerialPort("COM4", {
    baudRate: 9600,
    parser: SerialPort.parsers.readline("\r\n")
});

port.isReady = false;

function btnSendSerial(e) {
    //var str = document.getElementById("input").value;
    if (port.isReady) {
        console.log("start");
        currentLine=0;
        e.disabled = sendNextLine();
    } else {
        alert("Serial not ready");
    }
}

function sendNextLine(){
    if(currentLine<lines.length){
        port.write(lines[currentLine].line+"#");
        currentLine += lines[currentLine].next;
        return true;
    }else{
        return false;
    }
}

port.on('data', (data) => {
    if (data == "#begin#") {
        port.isReady = true;
        dbmsg("Arduino started");
    }
    if(data =="#next#"){
        if(!sendNextLine()){
            console.log("end");
            document.getElementById("btnSend").disabled = false;
        }
    }
    dbdata(data);
});

port.on('error',  (err) => {
    dbmsg('Error: ', err.message);
});

function filterComment(line){
    if(!(line.startsWith("(")||line.startsWith("%")||line.startsWith("\r"))){
        return line;
    }
}

function openFile() {
    dialog.showOpenDialog(function (fileNames) {
        if (fileNames === undefined) return;
        var fileName = fileNames[0];

        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) throw err;
            
            var tmpLines = data.split("\n");
            GCODEviewer.addLines( tmpLines );
            var lastValidLine = 0;
            var n=0;
            for( var i=0 ; i<tmpLines.length ; i++ ){
                lines.push({
                    line:tmpLines[i],
                    next:1,
                });
                if(!(tmpLines[i].startsWith("(")||tmpLines[i].startsWith("%")||tmpLines[i].startsWith("\r"))){
                    if( i==0 )  lines[ lastValidLine ].next = n-1;
                    else        lines[ lastValidLine ].next = n;
                    lastValidLine = i;
                    n=1;
                }else{
                    n++;
                }
            }
            lines[ lastValidLine ].next = n;
            dbdata(lines);
            /*
            var finalLines = [];
            var lastValidLine = 0;
            
            var i = 0;
            lines.forEach( (line)=>{
                finalLines.push({
                    line:line,
                    next:1,
                });
                if(!(line.startsWith("(")||line.startsWith("%")||line.startsWith("\r"))){
                    finalLines[ lastValidLine ].next = i;
                    lastValidLine = i;
                    i=0;
                }else{
                    i++;
                }
            });
            dbdata( finalLines );

            /*

            linesToSend = lines.filter(filterComment);
            console.log(lines);
            dbmsg(linesToSend);
            */
        });

    });

}
