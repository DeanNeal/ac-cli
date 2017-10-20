#!/usr/bin/env node

const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');
const mkdirp = require('mkdirp');
const isGlobal = require("is-global");
const globalModules = require('global-modules');
const Handlebars = require('handlebars');
let componentPath = '';
// Delete the 0 and 1 argument (node and script.js)
const args = process.argv.splice(process.execArgv.length + 2);

if (isGlobal()) {
    componentPath = globalModules + '/ac-cli/lib/component.html';
} else {
    componentPath = './lib/component.html';
}


if (args[0] === 'g') {

} else {

}

switch(args[0]) {
    case 'g':
        if (args[1]) {
            const dir = args[1] //+ '/' + args[2];
            const pathArray = dir.split('/');
            const componentName = pathArray[pathArray.length - 1];
            console.log();
            // if (fs.existsSync(dir)) {
            //     rimraf(dir, function() {
            //         console.log('folder is removed');
            //         createComponent(dir);
            //     });
            // } else {
            createComponent(dir, componentName);
            // }
        }
    break;
    default:
        console.warn('unknown command'); 
    break;
}

function createComponent(dir, componentName) {
    mkdirp(dir, function(err) {
        if (err) {
            console.error(err)
        } else {
            const filepath = dir + '/' + componentName + '.component';

            getComponent(componentPath, (fileContent) => {

                fileContent = Handlebars.compile(fileContent);
                fileContent = fileContent({ name: componentName, compName: jsUcfirst(componentName)});

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

function getComponent(path, callback) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }

        callback(data);
    });
}

function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}