var expect = require('chai').expect;
var Parser = require('../src/CommandParser');

describe('Parser', function() {
    var parser;

    before(function() {
        parser = new Parser();
    });

    it('should throw an error if no instructions are passed', function(done) {
        parser.parseParameters('', function(err) {
            expect(err).to.exist;
            done();
        });
    });

    it('should correctly parse file contents into an array of instructions', function(done) {
        parser.parseParameters('PLACE 0,0,NORTH --MOVE --LEFT --RIGHT --REPORT', function(err, instructionList) {
            expect(instructionList).to.deep.equal([
                {
                    command: 'place',
                    args: [0, 0, 'north']
                }, {
                    command: 'move'
                }, {
                    command: 'turn',
                    args: 'left'
                }, {
                    command: 'turn',
                    args: 'right'
                }, {
                    command: 'report'
                }
            ]);
            done();
        });
    });

    it('should not parse any unknown instructions', function(done) {
        parser.parseParameters('PLACE 0,0,NORTH --slartybartfast --marco polo --PLACE 0,1,north-west --MOVE --REPORT', function(err, instructionList) {
            expect(instructionList).to.deep.equal([
                {
                    command: 'place',
                    args: [0, 0, 'north']
                }, {
                    command: 'move'
                }, {
                    command: 'report'
                }
            ]);
            done();
        });
    });
});