var comPort="";
var port;
var PortSet=false;

const {dialog,Menu} = require('electron').remote;

function setCOMPort(portName){
    comPort=portName;
    port = new SerialPort(comPort, {
        baudRate: 9600,
        parser: SerialPort.parsers.readline("\r\n")
    });
    PortSet= true;
    port.isReady = false;
}
function setMenu(){
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}
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