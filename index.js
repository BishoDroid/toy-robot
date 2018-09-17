var Robot = require('./src/Robot');
var FileReader = require('./src/InstructionsReader');
var Parser = require('./src/CommandParser');

/**
 * Set up instances for usage
 */
var robot = new Robot();
var fileReader = new FileReader();
var parser = new Parser();

/**
 * Application module
 */
var app = {};

/**
 * Read and parse file name
 * @param {String} fileName File to read and parse
 * @param {Function} cb Callback function
 */
app.readAndParseFile = function(fileName, cb) {
    fileReader.readInputFile(fileName, function(err, fileData) {
        if (err) {
            cb(err);
            return false;
        }

        parser.parseParameters(fileData, function(err, instructionList) {
            if (err) {
                cb(err);
                return false;
            }

            cb(null, instructionList);
        })
    });
};

/**
 * Run simulation using a file or by passing by passing instructions
 * @param {String} instructions - string of instructions or a file path to be used to run the simulation on
 * @param {Function} cb Callback function
 */
app.runSimulation = function(instructions, cb) {
    //If it is a file
    if(instructions.endsWith(".txt")){
        this.readAndParseFile(instructions, function(err, instructionList) {
            if (err) {
                cb(err);
                return false;
            }

            robot = robot.runInstructions(instructionList);
            cb(null, robot);
        });
    }
    //Else, must be instructions. will be parsed then passed as options
    else{
        parser.parseParameters(instructions, function (err, instructionsList) {
            if (err) {
                cb(err);
                return false;
            }
            robot = robot.runInstructions(instructionsList);
            cb(null, robot);
        });
    }
};

module.exports = app;