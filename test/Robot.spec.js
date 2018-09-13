var expect = require('chai').expect;
var sinon = require('sinon');
var Robot = require('../src/Robot');

describe('Robot', function() {
    var robot;
    var stub;

    beforeEach(function() {
        robot = new Robot();
    });

    it('should place a robot correctly on valid point on the table', function() {
        robot = robot.place([0,1,'north']);
        expect(robot.isPlaced).to.be.true;
        expect(robot.position).to.deep.equal({x: 0, y: 1});
        expect(robot.direction).to.equal('north');
    });

    it('should ignore any place instruction that is off the board', function() {
        robot = robot.place([0,1,'north']);
        robot = robot.place([6,3,'west']);
        expect(robot.isPlaced).to.be.true;
        expect(robot.position).to.deep.equal({x: 0, y: 1});
        expect(robot.direction).to.equal('north');
    });

    it('should correctly replace the robot if asked to', function() {
        robot = robot.place([0,1,'north']);
        robot = robot.move();
        robot = robot.place([2,2,'east']);
        expect(robot.position).to.deep.equal({x: 2, y: 2});
        expect(robot.direction).to.equal('east');

    });

    it('should correctly turn when issued a turn command', function() {
        robot = robot.place([0,1,'east']);
        robot = robot.turn('left');
        expect(robot.direction).to.equal('north');
    });

    it('should correctly move when issued a move command', function() {
        robot = robot.place([0,1,'east']);
        robot = robot.move();
        expect(robot.position).to.deep.equal({x: 1, y: 1});
    });
});