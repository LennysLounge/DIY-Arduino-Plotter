const {dialog,Menu} = require('electron').remote;
function setCOMPort(port){
    console.log(port);
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