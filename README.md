<h1 align="center">THREE.js Solar System</h1>
<h2 align="center">Computer Graphics</h2>
<p align="center">This project presents an interactive representation of the solar system.</p>

## Description

It has a basis on concepts related to basic geometry generation, pivots, hierarchical transformations, materials and textures. The project gives an animated and interactive representation of the solar system including the 8 planets (and Pluto), the asteroid belt between Mars and Jupiter, satellites and, of course, the Sun.

## Dependencies

The libraries used for the development are the following:

- [THREE.js](https://threejs.org/)
- [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)

## General Work-flow

1. The scene is created with the basic configuration alongside all its lighting and camera components.
2. The orbit controls are instanced.
3. The object classes are generated, the class will be responsible for the following:
   1. Creating the reference pivot.
   2. Creating the meshes.
   3. Creating satellites pivots.
   4. Performing transformations via an update that is handled by the animate function.
4. Each object is pushed to an array containing all of the objects.
5. The orbits are created and added to an orbit group.
6. Satellites are generated and added to the reference planet with their respective random transformation values and are added to the objects array.
7. The asteroid belt is generated through randomly generated values and each element is added to the asteroid array.
8. The object array values are added to a group and then passed to the solar system group alongside the asteroids and orbits.
9. Solar system is added to the scene which will be displayed.

## Code Sections

The code is separated into distinct parts that will be described in a simple fashion in the following subsections:

### Global Variables

```javascript
let mult;
let translations = {};
let rotations = {};
let object_array = [];          
```

To make the code simpler in the next sections, the first variable is a constant that serves as a way to slow down animations, following two variables are dictionaries that contain constant values that will dictate the translation and axial rotation speeds accordingly, and the object_array will store all the created objects.

### Celestial Body Class

```javascript
class celestialBody{                                                            
	constructor(type, size, offset, texture_url, normal_url, bump_url, ring_url, parent_position, translation, rot, n_sats){
        ...
    }
    add_satelite{}
    update{}
}
```

This class is very important in the program because it does almost all the work. When the objects re instanced, it assigns the constructor variables (this.x = x), it creates a new pivot for translation based on the `parent_position` coordinates, calls the `createObject()` function, will move the object based on the `offset` value and will assign the new celestial_body to the generated pivot. The `*_url` parameters are sent to the `createObject()` function, the `rot` and  `translation` will contain the dictionary respective value, and  `n_sats` is the number of satellites in a father object.

The function  `add_satelite()`  adds the  `n_sats` number of satellites to the father object, and the  `update()`  will be in charge of the transformations such as translation and rotation.

### Animate Function

```javascript
function animate(){
	...
}
```

This function will be called to update the values needed for the animations and the orbit control in the program.

### Create Object Function

```javascript
function createObject(type, size, texture_url, normal_url, bump_url, ring_url){
    ...
    return new_object                                                           
}                 
```

Creates the new object with a sphere geometry and a MeshPhongMaterial given the parameters sent by the `celestialBody()` class generated though the instances of these. Based on the type it will add or omit different textures, the logical reasoning is the followig:

- 0: General, as every element in the program it will have a texture map and might have a bump or normal map.
- 1: Stars, the material is changed to MeshBasicMaterial due to lighting conditions and the object is instanced again.
- 2: Celestial bodies with rings, A ring is added to the object and tilted a little bit.
- 3: Satellites, just for logical reasoning at the time being.
- 4: Asteroid belt, just for logical reasoning at the time being.

### Orbit Creation

```javascript
function createOrbit(outer_radius){
	...
	return new_orbit;
}
```

Simple function that generates disks of very small inner to outer radius ratio to represent the orbits of the planets. It receives the offset value and outputs the orbit object in the corresponding parent pivot.

### Create Scene

```javascript
function createScene(canvas) {    
    ...
    let solar_system = new THREE.Object3D;
    let object_array_group = new THREE.Object3D;
    let orbits = new THREE.Object3D;
    
    let sun = new celestialBody(1, 30, 0, "../../Planet_Resources/Textures/2k_sun.jpg", "", "", "", solar_system.position, 0, rotations["sun"], 0);
    object_array.push(sun);
    ...
}

```

The longest function, it sets the scene with its camera, lighting and basic set-up,  creates the used groups, instances the objects and adds them to the object_array, calls the `createOrbit()`  function, (attempts) to create the satellites, generates the asteroid belt via a for loop, adds the object_array pivots to a group that then are passed to the solar system alongside the orbits and asteroid pivots to then add them to the scene.



## NOTE

The resources such as textures, bumps and normals can be found at `../../Planet_Resources`.
