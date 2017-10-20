#!/usr/bin/env node
const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');
const mkdirp = require('mkdirp');

const componentPath =  './lib/component.js';

// Delete the 0 and 1 argument (node and script.js)
const args = process.argv.splice(process.execArgv.length + 2);


if(args[0] === 'g') {
	if(args[1]) {
		const dir = args[1];

		if (fs.existsSync(dir)){
			
			rimraf(dir, function () {
				 console.log('folder is removed');
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
    	const filepath = args[1] + '/' + args[2] + '.component';

    	getComponent(componentPath, (fileContent)=>{
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