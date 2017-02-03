const {dialog,Menu} = require('electron').remote;

function setCOMPort(port){
    console.log(port);
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