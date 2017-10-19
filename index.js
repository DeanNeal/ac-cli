#!/usr/bin/env node
var fs = require('fs');
var rimraf = require('rimraf');
const path = require('path');
var mkdirp = require('mkdirp');

// Delete the 0 and 1 argument (node and script.js)
var args = process.argv.splice(process.execArgv.length + 2);
// console.log(args);

// The absolute path of the new file with its name

if(args[0] === 'g') {
	if(args[1]) {
		var dir = args[1];

		if (fs.existsSync(dir)){
			console.log('done');
			rimraf(dir, function () {
				 createComponent(dir);
			});
		} else {
			createComponent(dir);
		}


	}
}

function getComponent(path, callback) {
	fs.readFile(path, 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }
	  
	  callback(data);
	});
}


function createComponent(dir) {
	mkdirp(dir, function (err) {
    if (err) {
   		 console.error(err)	
    } else {
    	console.log('pow!')

    	var filepath = args[1] + '/' + args[2] + '.component';

    	getComponent('lib/component.js', (fileContent)=>{
    		  fs.writeFile(filepath + '.js', fileContent, (err) => {
    		      if (err) throw err;
    		  }); 

    		  fs.writeFile(filepath + '.html', '', (err) => {
    		      if (err) throw err;
    		  }); 
    		 console.log('Component is created');
    	});
    }
});
}