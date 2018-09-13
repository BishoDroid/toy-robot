/**
 * Parser constructor
 * @constructor
 */
var CommandParser = function () {};

/**
 * Parse raw arguments from file contents
 * @param {String} params Robot instruction list from file
 * @param {Function} cb Callback function
 */
CommandParser.prototype.parseParameters = function(params, cb) {
    // Throw error if no instructions are passed
    if (!params.length) {
        cb(new RangeError('Must pass instructions to the robot'));
        return false;
    }

    var parsedParamsArray = params
        .split(' --')
        .map(function(instruction) {
            return instruction.toLowerCase();
        })
        .reduce(function(instructionList, rawInstruction) {

            var parsedInstruction = this.parseInstruction(rawInstruction);

            if (parsedInstruction) {
                instructionList.push(parsedInstruction);
            }
            return instructionList;
        }.bind(this), []);

    // Throw error if no valid instructions were passed
    if (!parsedParamsArray.length) {
        cb(new TypeError('No valid instructions passed'));
        return false;
    }

    cb(null, parsedParamsArray);
};

/**
 * Valid directions for placement of robot
 * @type {string[]}
 */
CommandParser.prototype.validDirections = ['north', 'south', 'east', 'west'];

/**
 * Parse a raw instruction into an object
 * @param {String} rawInstructionString Instruction string from input file
 * @returns {*}
 */
CommandParser.prototype.parseInstruction = function(rawInstructionString) {
    var instructionObject;
    var multiWordInstructionList = rawInstructionString.split(' ');

    if (multiWordInstructionList.length > 1 && multiWordInstructionList[0] === 'place') {
        instructionObject = this.parsePlaceInstruction(multiWordInstructionList);
    } else {
        instructionObject = this.parseSingleWordInstruction(rawInstructionString);
    }

    if (instructionObject) {
        return instructionObject;
    }
};

/**
 * Parse place instructions
 * @param {Array} placeParts Place instruction parts
 * @returns {*}
 */
CommandParser.prototype.parsePlaceInstruction = function(placeParts) {
    var placeArgsList = placeParts[1].split(',');

    var x = parseInt(placeArgsList[0], 10);
    var y = parseInt(placeArgsList[1], 10);
    var direction = placeArgsList[2];

    if (!isNaN(x) && !isNaN(y) && (this.validDirections.indexOf(direction) > -1)) {
        return {
            command: 'place',
            args: [x, y, direction]
        };
    } else {
        return null;
    }
};

/**
 * Parse non-place, single word instructions
 * @param {String} instructionString Single word instruction
 * @returns {*}
 */
CommandParser.prototype.parseSingleWordInstruction = function(instructionString) {
    switch (instructionString) {
        case 'move':
            return {
                command: 'move'
            };
        case 'left':
            return {
                command: 'turn',
                args: 'left'
            };
        case 'right':
            return {
                command: 'turn',
                args: 'right'
            };
        case 'report':
            return {
                command: 'report'
            };
        default:
            return null;
    }
};

module.exports = CommandParser;