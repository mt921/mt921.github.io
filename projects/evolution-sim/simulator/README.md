# v5.0.0
Included energy loss & elimination
Ability to grow
reconfigured simulator to work for any value of simSize 
created wraparound to allow agents to move freely from one side to another (based on agent size)

## v4.1.0
Added boundary conditions so that agents cannot exit the map.

# v4.0.0
Finalised cloning methods (including mutations) & energy methods using probabilities.

## v3.2.0
Converted cloning to an internal process.

## v3.1.0
Implemented mutations within cloning processes.

# v3.0.0
Implemented mocha testing.

### v2.2.1 & v2.2.2 
Minor updates to matrix generation function using arrow functions
Updates to scaleArray using arrow functions.

## v2.2.0
Included normal distribution functionality
Reference: https://mika-s.github.io/javascript/random/normal-distributed/2019/05/15/generating-normally-distributed-random-numbers-in-javascript.html

## v2.1.0
Motion is defined using a direction vector & angle.
Initial cloning processes were defined.
Energy systems setup.

# v2.0.0
Matrices can be generated with any 2D dimensions.
Agent brain size can be selected & used to generate (A,M).

# v1.0.0
Implemented modules:
- agent.js: constructor takes an array & matrix, time-steps are performed by multiplying these arguments, outputs are read from the final array elements
- canvas.js: creates a canvas element within the document 
- display.js: defines methods to display background, individual agent & total system
- generate.js: randomly distributed matrices & arrays can be generated, sizes are hard-coded
- math.js: implementing some additional math functions to use throughout project
- system.js: methods to control different parts of the system
