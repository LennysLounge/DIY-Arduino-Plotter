const {app,BrowserWindow,Menu} = require('electron');

let win;

/*
const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open',
                click: () => {
                    console.log('About Clicked');
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
*/
app.on('ready', () => {
    win = new BrowserWindow({width:800,height:600});
    win.loadURL('file://'+ __dirname +"/index.html");
	win.webContents.openDevTools();
});


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