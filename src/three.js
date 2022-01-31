import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';


function getCenterPoint(mesh) {
  // This function get center points coordinates of a cube
  // input  :mesh object (cube in this case)
  // output :middle of the cube
    var middle = new THREE.Vector3();
    var geometry = mesh.geometry;

    geometry.computeBoundingBox();

    middle.x = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
    middle.y = (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2;
    middle.z = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2;

    mesh.localToWorld( middle );
    return middle;
}

function randomIntFromInterval(min, max) { 
  // This function returns a random integer between min and max (included) 
  //input: min value
  //input: max value
  //output: random number between min and max
  
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(array) {
  // This function makes copy and shuffles the copy values 
  // input : array
  // output : shuffled array
  var new_array = Array.from(array);
    for (var i = array.length - 1; i > 0; i--) {
        var j = randomIntFromInterval(0, 5)
        var k = randomIntFromInterval(0, 5)
        var temp = new_array[j]
        new_array[j] = new_array[k];
        new_array[k] = temp;
  }
  return new_array;
};

function distanceVector( v1, v2 ){
  // This function computes the distance between two points in the 3D space 
  // input point 1 coordinates
  // input point 2 coordinates
  // output distance between two points
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;

    return Math.sqrt( dx * dx + dy * dy + dz * dz );
};


function create_random_colors_for_geometry(shuffled_colors){
  // This function creates geometry object with random color faces 
  // input shuffled colors list
  // output Geometry object with shuffled colors
  var geometry = new THREE.CubeGeometry(1,1,1);
    for ( var i = 0; i < geometry.faces.length; i ++ ) {
      geometry.faces[i].color.setHex(shuffled_colors[Math.floor(i/2)]);
    }
    
  return geometry;
};

function hex_to_colorName(hex_face_color){
  
  //This function convert face color HEX (string) to color name (string)
  //input: hex_face_color (string)
  //output: color name (string)
  if (hex_face_color === "000000"){
    return "black";
  }
  if (hex_face_color === "800080"){
    return "purple";
  }
  if (hex_face_color === "ffff00"){
    return "yellow";
  }
  if (hex_face_color === "0000ff"){
    return "blue";
  }
  if (hex_face_color === "008000"){
    return "green";
  }
  if (hex_face_color === "ff0000"){
    return "red";
  }

};

function get_collision_face_color(cube, speed_vector){

  // This function gets collisation face color
  //input  cube object
  //input  speed vector
  //output colide face color
  
  var geometry = cube.geometry;
  
  for ( var i = 0; i < geometry.faces.length; i ++ ) {
    
    var face_normal_vector = geometry.faces[i].normal;
    cube.localToWorld(face_normal_vector);
    // see which face is gonna make the colision using a scalar product between nomal vector of a a face and speed vector 
    if (face_normal_vector.dot(speed_vector)>0){
      
      var hex_face_color = geometry.faces[i].color.getHexString();
      var color = hex_to_colorName(hex_face_color);
      return color;
    } 
  }
};

function create_the_random_colored_cube(){
  // This function creates the random colored cube
  
  const colors_list = [0x000000, 0x800080, 0xFFFF00, 0x0000FF, 0x008000, 0xFF0000]; // list of colors
  var shuffled_colors = shuffle(colors_list); // shuffle colors for cube 2
  var geometry = create_random_colors_for_geometry(shuffled_colors); // set colors on faces and create the geometry for cube 1
  var cubeMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff, vertexColors: THREE.FaceColors} );
  var cube = new THREE.Mesh(geometry, cubeMaterial); // cube B (B == 2 for all algorithms)
  return cube
};


function animate() { 

    // This function annimates the scene
   
    requestAnimationFrame(animate); 
    
    cube_A.translateX(cube_speed_vector_A.x);
    cube_A.translateY(cube_speed_vector_A.y);
    cube_A.translateZ(cube_speed_vector_A.z);

	  cube_B.translateX(cube_speed_vector_B.x);
	  cube_B.translateY(cube_speed_vector_B.y);
    cube_B.translateZ(cube_speed_vector_B.z);
    
    var center_cube_A = getCenterPoint(cube_A);
    var center_cube_B = getCenterPoint(cube_B);

    if (distanceVector(center_cube_A, center_cube_B) === 1){
     
      if (color_face_cube_A === color_face_cube_B){//If both cubes collide with the same colour face, then both cubes will be deleted.
        scene.remove(cube_A);
        scene.remove(cube_B);
      };

      if (color_face_cube_B === "black"){//If cube A’s face collides with cube B’s black face, then cube A will be deleted.
        scene.remove(cube_A);
      };

      if (color_face_cube_B === "red"){//If cube A’s face collides with cube B’s red face, then cube A will come to a full stop.
        cube_speed_vector_A.x = 0;
        cube_speed_vector_A.y = 0;
        cube_speed_vector_A.z = 0;
      };

      if (color_face_cube_B === "green"){//If cube A’s face collides with cube B’s green face, then cube A will continue travelling at double the speed.
        cube_speed_vector_A.x = 2*cube_speed_vector_A.x;
        cube_speed_vector_A.y = 2*cube_speed_vector_A.y;
        cube_speed_vector_A.z = 2*cube_speed_vector_A.z;
      };

      if (color_face_cube_B === "blue"){//If cube A’s face collides with cube B’s blue face, then cube A will reverse its speed.
        cube_speed_vector_A.x = -1*cube_speed_vector_A.x;
        cube_speed_vector_A.y = -1*cube_speed_vector_A.y;
        cube_speed_vector_A.z = -1*cube_speed_vector_A.z;
      };

      if (color_face_cube_B === "yellow"){//If cube A’s face collides with cube B’s yellow face, then cube A will continue travelling at half the speed.
        cube_speed_vector_A.x = 0.5*cube_speed_vector_A.x;
        cube_speed_vector_A.y = 0.5*cube_speed_vector_A.y;
        cube_speed_vector_A.z = 0.5*cube_speed_vector_A.z;
      };

      if (color_face_cube_B === "purple"){//If cube A’s face collides with cube B’s purple face, then cube A will continue travelling at a random trajectory.
        cube_speed_vector_A.x = randomIntFromInterval(0.005, 0.5);
        cube_speed_vector_A.y = randomIntFromInterval(0.005, 0.5);
        cube_speed_vector_A.z = randomIntFromInterval(0.005, 0.5);
      };
   };
    
    controls.update();
    renderer.render(scene, camera); 
};


// Make Scene Camera and Render (we want to add something interactive)
var scene = new THREE.Scene(); 
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000); 
var renderer = new THREE.WebGLRenderer();
var controls = new OrbitControls(camera, renderer.domElement );

renderer.setSize(window.innerWidth, window.innerHeight); 
renderer.setClearColor(0xE8E8E8, 1); // bg color
document.body.appendChild(renderer.domElement); // displays canvas

camera.position.z = 13; // move away to see coord center
camera.position.y = 0;

controls.update();

// Add grid helper
var gridHelper = new THREE.GridHelper( 100, 100 );
gridHelper.colorGrid = 0x000000;
scene.add( gridHelper );


// Add an axis helper
var ah = new THREE.AxisHelper(50);
ah.position.y -= 0.1;  // The axis helper should not intefere with the grid helper
scene.add( ah );

// CUBES

var cube_A = create_the_random_colored_cube()
scene.add(cube_A); // add cube to scene
cube_A.position.set(-7, 0, 0); // set initial position of cube 1

var cube_B = create_the_random_colored_cube()
scene.add(cube_B); // add cube to scene
cube_B.position.set(7, 0, 0); // set initial position of cube 2

// SET CUBES SPEED
var cube_speed_vector_A = new THREE.Vector3(0.05, 0, 0); // set speed vector cube 1
var cube_speed_vector_B = new THREE.Vector3(-cube_speed_vector_A.x, -cube_speed_vector_A.y, -cube_speed_vector_A.z); // set speed vector cube 1

// GET CUBES COLLISION FACES COLORS
var color_face_cube_A = get_collision_face_color(cube_A, cube_speed_vector_A); // this function doesn't work and we must find solution here;
var color_face_cube_B = get_collision_face_color(cube_B, cube_speed_vector_B); //this function doesn't work and we must find solution here;


// SHOW CUBES COLOR FACES (HTML)
document.getElementById('cube_A').innerHTML = color_face_cube_A;
document.getElementById('cube_B').innerHTML = color_face_cube_B;

var run = true;
var startButton = document.getElementById( 'startButtonId' );
var resetButton = document.getElementById( 'resetButtonId' );

var current_cube_speed_vector_A = new THREE.Vector3()
var current_cube_speed_vector_B = new THREE.Vector3();

current_cube_speed_vector_A.copy(cube_speed_vector_A)
current_cube_speed_vector_B.copy(cube_speed_vector_B)

// Start Button
startButton.onclick = function StartAnimation() {
  // Start and Pause 
  if (run) { 
    startButton.innerHTML = 'Resume';
    run = false;
    current_cube_speed_vector_A.copy(cube_speed_vector_A);
    current_cube_speed_vector_B.copy(cube_speed_vector_B);

    cube_speed_vector_A.set(0,0,0);
    cube_speed_vector_B.set(0,0,0);

  } else {
    startButton.innerHTML = 'Pause';
    run = true;
    cube_speed_vector_A.copy(current_cube_speed_vector_A);
    cube_speed_vector_B.copy(current_cube_speed_vector_B);
  }
}

// Reset Button
  resetButton.onclick = function ResetParameters() {

  scene.remove(cube_A);
  scene.remove(cube_B);

  cube_speed_vector_A = new THREE.Vector3(0.05, 0, 0);
  cube_speed_vector_B = new THREE.Vector3(-cube_speed_vector_A.x, -cube_speed_vector_A.y, -cube_speed_vector_A.z);


  cube_A = create_the_random_colored_cube()
  scene.add(cube_A); 
  cube_A.position.set(-4, 0, 0);

  cube_B = create_the_random_colored_cube()
  scene.add(cube_B);
  cube_B.position.set(4, 0, 0);

  color_face_cube_A = get_collision_face_color(cube_A, cube_speed_vector_A); // this function doesn't work and we must find solution here;
  color_face_cube_B = get_collision_face_color(cube_B, cube_speed_vector_B); //this function doesn't work and we must find solution here;

  document.getElementById('cube_A').innerHTML = color_face_cube_A;
  document.getElementById('cube_B').innerHTML = color_face_cube_B;
}

//ANIMATE and RENDER
animate();


