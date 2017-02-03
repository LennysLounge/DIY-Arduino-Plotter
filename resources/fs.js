const fs = require('fs');
const {dialog} = require('electron').remote;

function getFileFormDialog( callback ){
	dialog.showOpenDialog((fileNames) => {
        if (fileNames === undefined) return;
		callback( fileNames[0] );
	});
}

function openFile( path, callback ) {
	fs.readFile( path, 'utf8', (err, data) => {
		if (err){
			callback(false);
			return;
		}

		var lines = [];
		var tmpLines = data.split("\n");
		var lastValidLine = 0;
		var n = 0;
		for (var i = 0; i < tmpLines.length; i++) {
			lines.push({ next: 1, line: tmpLines[i]	});
			if (!(tmpLines[i].startsWith("(") || tmpLines[i].startsWith("%") || tmpLines[i].startsWith("\r"))) {
				if (i == 0) lines[lastValidLine].next = n - 1;
				else lines[lastValidLine].next = n;
				lastValidLine = i;
				n = 1;
			} else {
				n++;
			}
		}
		lines[lastValidLine].next = n;
		callback( lines );
	});
}