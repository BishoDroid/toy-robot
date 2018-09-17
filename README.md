# Robo-Toy 

A toy robot written in Node.js 

## Installation & usage

The robot can be installed globally or locally. 

**Global**

This will add ```robot``` to your path. Use it wherever you'd like. 
```sh
## install globally
$ npm install -g

## run
$ robot
```

**Local**

If you install it locally, you can use it within the directory via ```npm start``` or ```node```.
```sh
$ npm install
$ npm start 
$ node robot.js 
```

## Instruction format

The robot only accepts either:
- A .txt file containing the instructions
- The raw instructions passed in an interactive way.

The options the robot acceps are:
 - **PLACE X, Y, DIRECTION (PLACE 0,1,NORTH):** Place the robot on the table.
 - **MOVE:** Move the robot one unit in the direction it is facing
 - **LEFT:** Turn the robot left
 - **RIGHT:** Turn the robot right
 - **REPORT:** Report the current position and direction of the robot (0,0,NORTH)

The table is a 5x5 grid, and any command that would result in the robot being off the table *will be ignored*.

## Dependencies

- [cli-color](https://github.com/medikoo/cli-color)
- [prompt](https://github.com/flatiron/prompt)
- [underscore](https://github.com/jashkenas/underscore)

## Tests

```sh
$ npm test
```

Test input file are available in ```data```. 