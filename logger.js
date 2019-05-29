const path = require("path");
const bunyan = require("bunyan");

const level = "info";
const logPath = path.resolve(__dirname,"log.json");
const logPath1 = path.resolve(__dirname,"log1.json");  

module.exports = function(){
	return bunyan.createLogger( {
		name:"blueLog",
		streams: [
			{
			  level: 'error',
			  path: logPath  // log ERROR and above to a file
			},
			{
				level: 'info',
				path: logPath1            // log INFO and above to stdout
			}
		  ]
		
	});
}