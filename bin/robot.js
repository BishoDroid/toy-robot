#!/usr/bin/env node
var clc = require('cli-color');
var app = require('../index.js');
var prompt = require('prompt');

var info = clc.green;
var error = clc.white.bgRed;
var bold = clc.bold;

console.log(info("Hello there, I am " + clc.bold("Robo Toy")));
console.log(info("I am a small program that is built to move within a 5 X 5 box in four direction" +
    "and I can also report my current coordinates"));
console.log(info("You can either pass me your instructions in a file or directly via the command line in the following format:"));
console.log(clc.bgWhite(clc.black("PLACE 0,2,EAST --MOVE --MOVE --LEFT --REPORT")));
/**
 * The starting point of the program where the user decides if they wanna interact with
 * the robot via instructions file or via commands(interactive)
 */
var ask = function () {
    console.log(info('\nWould you like to interact with me or give mme instructions via a file?'))
    console.log(bold('A: ') + 'Interact' + '\n' + bold('B: ') + 'Provide file');

    prompt.start();

    prompt.get('command', function (err, result) {
        if (result.command.toLowerCase() === 'a') {
            console.log("Please provide your commands separated with white space");
            prompt.get('commands', function (err, result) {
                execute(result.commands);
            });
        }
        if (result.command.toLowerCase() === 'b') {
            console.log("Please provide path to your file... (current directory: "+__dirname.toLowerCase()+")");
            prompt.get('file', function (err, path) {
                var fileName = path.file;
                execute(fileName);
            });
        }
    });

};

var execute = function (fileName) {
    /**
     * Run the simulation
     */
    app.runSimulation(fileName, function (err, robot) {
        // If error, let the user know
        if (err) {
            console.log(error('ERROR:') + ' ' + clc.red(err.message));
            return false;
        }

        // If no valid place commands were given, let the user know
        if (!robot.isPlaced) {
            console.log(clc.yellow('Your robot was never placed on the table :('));
        }

        // Done, but ask if the user wants to continue
        console.log(clc.white('======================================================'));
        console.log(clc.blue('Your instructions have been executed!. Wanna give more instructions?'));
        console.log(bold('Y: ') + 'Yes, I would love to!')
        console.log(bold('N: ') + 'Nah, I am done!')
        prompt.start();
        prompt.get('answer', function (err, answer) {
            switch (answer.answer.toLowerCase()) {
                case 'y':
                    ask();
                    break;
                case 'n':
                    return;
                    break;
                default:
                    console.log(error('Invalid option'));
            }
        });
    });
};

ask();