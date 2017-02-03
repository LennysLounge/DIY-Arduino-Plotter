var lines = [];

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
		console.log( path );

		openFile( path, (lines) => {
			console.log( lines );
		});
	});
}
