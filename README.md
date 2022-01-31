# Vention-Test
This project presents a javascript algorithms using Three.js to simulate the collision between two cubes with randomized faces color. 

# Problem description
Using Three.js,
1. set up a 3-D space within which two visible cubes will travel along a 1-D trajectory
towards each other, with the normal vector of one face of a cube collinear to the normal
vector of a face of the other cube.
2. Each cube will have coloured faces. One colour per face (red, green, blue, yellow,
purple, black). Each cube will use the same 6 colors.
3. These two cubes will at some point collide with each other. The starting orientation of
each cube will be randomized so that collisions between all 36 face-to-face ordered pairs
of colours will be possible (eg. red-green, green-red, red-red, green-blue, etc...).
Based on the type of collision the resulting effect will be different. Below is the list of effects with
their priority ordered from top to bottom:
- If both cubes collide with the same colour face, then both cubes will be deleted.
- If cube A’s face collides with cube B’s black face, then cube A will be deleted.
- If cube A’s face collides with cube B’s red face, then cube A will come to a full stop.
- If cube A’s face collides with cube B’s green face, then cube A will continue travelling at
double the speed.
- If cube A’s face collides with cube B’s blue face, then cube A will reverse its speed.
- If cube A’s face collides with cube B’s yellow face, then cube A will continue travelling at
half the speed.
- If cube A’s face collides with cube B’s purple face, then cube A will continue travelling at
a random trajectory.

![alt text](https://github.com/FaroukBELLAHIRECH/Vention-Test/blob/main/image.png?raw=true)

# Problem solution
To solve this problem two key points are required:
  - Detect the collision.
  - Get the collided face color for the two cubes.
 
## Collision

To detect the collision an algorithm is developed to compute the centers of cubes and compute the distance between them to compare it to the edge distance.

![alt text](https://github.com/FaroukBELLAHIRECH/Vention-Test/blob/main/distance.png?raw=true)

The collision between the two cubes satisfies this condition D = L.

D represents the distance between the two cubes centers in the 3D space and L is the cube edge length (the two cubes are similar).

## Face color

The second step is to get the collided face color using a dot product between the velocity vector of the cube and all faces normal vectors <V, Ni>, where Ni is the normal vector of the face i.  

![alt text](https://github.com/FaroukBELLAHIRECH/Vention-Test/blob/main/dot.png?raw=true)

To detect the face index i the dot product must satisfy this condition <Ni, V> > 0.

# Functions and Object dependencies 

The code contains functions only, in this graph we want to explain the interaction between those functions.

![alt text](https://github.com/FaroukBELLAHIRECH/Vention-Test/blob/main/Process.png?raw=true)

The project contains a HTML file (index.html) in the root and a javascript file (three.js) in the src folder, also this project contains image folder which contains images used in the README.md file. 

# Run the project on VS code

To run this code on VS code, we have to install some extensions:
  - Live Server
  - JavaScript (ES6) code snippets 

# Results

After running the project on VS code the user will see a simulation of the collision of two cubes.

![alt text](https://github.com/FaroukBELLAHIRECH/Vention-Test/blob/main/HTML_SCS.png?raw=true)

- Box 1 shows cube A collision face color.
- Box 2 shows cube B collision face color.
- Box 3 contains two buttons Pause/Resume and Reset.

The figure below shows the collision faces colors of the two cubes, the user can change the camera angle and can zoom in and zoom out with the mouse.

![alt text](https://github.com/FaroukBELLAHIRECH/Vention-Test/blob/main/Angle_change.png?raw=true)
