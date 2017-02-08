var lines = [];
var filePath = "";
var fileReady = false;
var GCODEviewer = new CODEviewer("GCODElist");


//	Moves the view towards the main view and hides the options
function btn_gotoMain() {
    var options = document.getElementById("options");
    var child = options.children[0];
    var eStyle = window.getComputedStyle(options);
    var cStyle = window.getComputedStyle(child);
    var width = parseInt(cStyle.getPropertyValue("width"));
    var time = parseFloat(eStyle.getPropertyValue("transition-duration"));
    setTimeout(() => {
        options.style.visibility = "hidden";
    }, time * 1000);
    options.style.left = -width + "px";
    options.style.backgroundColor = "rgba(0, 0, 0, 0)";
}

//	Moves the view towards the Options and hides the main view
function btn_gotoOptions() {
    var options = document.getElementById("options");
    options.style.visibility = "visible";
    options.style.left = "0";
    options.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
}

//	File Dialog to select File
function btn_SetNextLetter(){
    nextLetter = document.getElementById("SetNext").value;
}
function btn_selectFile() {
    getFileFormDialog((path) => {
        filePath = path;
        e = document.getElementById("filePath");
        e.innerText = path;
    });
}

//Opens file from path and parses it for comments
function btn_loadFile() {
    openFile(filePath, (linesLocal) => {
        if (linesLocal === false) {
            alert("woopsy daisy");
        } else {
            lines = linesLocal;
            fileReady = true;
            GCODEviewer.e = document.getElementById("GCODElist");
            GCODEviewer.addLines(lines);
        }
    });

}

function btn_refreshCOM() {
    document.getElementById("COMports").innerHTML = "";
    Port.show();
}

function btn_connectCOM() {
    var e = document.getElementById("COMports");
    setPort = Port.open(e.options[e.selectedIndex].value);
    PortReady = false;
    startReading();
}

function btn_SendData(e) {
    if (PortReady) {
        currentLine = 0;
        e.disabled = sendNextLine();
    } else {
        alert("Serial not ready or not connected");
    }
}

//class to controll the CodeViewer
function CODEviewer(id) {
    console.log(id);
    this.lines = [];
    this.activeLine = 0;

    this.e = document.getElementById(id);
    console.log(this.e);
    this.addLines = (lines) => {
        console.log(this.e.innerHTML);
        this.e.innerHTML = "";
        console.log(this.e);
        this.lines = lines;
        this.build();
    }
    this.build = () => {
        var i = 0;
        var validLine = 0;
        this.e.innerHTML = "";
        this.lines.forEach((line) => {
            var str = "<div class='line ";
            if (i == validLine) {
                validLine += line.next;
                str += "validLine ";
            }
            str += "'>" + line.line + "</div>";
            this.e.innerHTML += str;
            i++;
        }, this);
        this.update( this.activeLine );
    }
    this.update = function(activeLine) {
        
        this.e.children[this.activeLine].className = "line validLine";
        this.activeLine = activeLine;
        this.e.children[this.activeLine].className += "activeLine";
        var eStyle = window.getComputedStyle(this.e);
        var lineHight = parseInt(eStyle.getPropertyValue("line-height"));

        this.e.style.marginTop = -lineHight * this.activeLine+"px";
        //this.build();
    }
}
