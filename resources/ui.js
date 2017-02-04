var lines = [];
var filePath = "";
var fileReady = false;
var GCODEviewer = new CODEviewer();


window.onload = function() {
	GCODEviewer.e = document.getElementById("GCODEviewer");
}


//	Moves the view towards the main view and hides the options
function btn_gotoMain(){
	var options = document.getElementById("options");
	var main = document.getElementById("main");
	options.style.left = "-100%";
	main.style.left = "0";
}

//	Moves the view towards the Options and hides the main view
function btn_gotoOptions(){
	var options = document.getElementById("options");
	var main = document.getElementById("main");
	options.style.left = "0";
	main.style.left = "100%";
}

//	File Dialog to select File
function btn_selectFile(){
	getFileFormDialog( (path) => {
		filePath = path;
		e = document.getElementById("filePath");
		e.innerText = path;
	});
}

//Opens file from path and parses it for comments
function btn_loadFile(){
	openFile( filePath, (linesLocal) => {
		if( linesLocal === false ){
			alert("woopsy daisy");
		}else{
			lines = linesLocal;
			fileReady = true;
			GCODEviewer.e = document.getElementById("GCODEviewer");
			GCODEviewer.addLines( lines );
		}
	});

}
function btn_refreshCOM(){
	document.getElementById("COMports").innerHTML="";
	Port.show();
}
function btn_connectCOM(){
	var e = document.getElementById("COMports");
	setPort = Port.open(e.options[e.selectedIndex].value);
	PortReady = false;
	startReading();
}
function btn_SendData(e){
	if (PortReady) {
			currentLine = 0;
			e.disabled = sendNextLine();
	} else {
			alert("Serial not ready or not connected");
	}
}

//class to controll the CodeViewer
function CODEviewer() {
    this.lines = [];
    this.e = undefined;
    this.activeLine = 0;
    this.addLines =  (lines) =>{
		this.e.innerHTML = "";
        this.lines = lines;
        this.build();
    }
    this.build =  () =>{
		var i = 0;
		var validLine = 0;
		this.e.innerHTML = "";
        this.lines.forEach((line) => {
			var str = "<div class='";
			if( i == validLine ){
				validLine += line.next;
				str += "validLine ";
			}
			if( i == this.activeLine ){
				str += "activeLine ";
			}
            str += "'>"+line.line+"</div>";
			this.e.innerHTML += str;
			i++;
        }, this);
    }
    this.update = function (activeLine) {
			this.activeLine = activeLine;
			this.build();
    }
}
