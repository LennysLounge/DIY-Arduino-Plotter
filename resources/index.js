const DEBUG = true;
var dbmsg = function () { };
var dbdata = function () { };
if (DEBUG) {
    dbmsg = console.log.bind(window.console);
    dbdata = console.dir.bind(window.console);
}