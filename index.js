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
 * Run simulation using input file
 * @param {String} fileName File to run the simulation on
 * @param {Function} cb Callback function
 */
app.runSimulation = function(fileName, cb) {
    this.readAndParseFile(fileName, function(err, instructionList) {
        if (err) {
            cb(err);
            return false;
        }

        robot = robot.runInstructions(instructionList);
        cb(null, robot);
    });
};

module.exports = app;