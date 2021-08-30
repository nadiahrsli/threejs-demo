// A THREE.js Environment is made up of 5 things:
// - Renderer (what the user sees)
// - Scene (the data)
// - Camera (the perspective)
// - Meshes (objects in the 3D world)
// - Lights

const THREE = require("three");

function createRenderer() {
  let renderer = new THREE.WebGLRenderer({
    antialias: true, //get clear image
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("#16161d"); // set the background canvas color to some color
  renderer.setPixelRatio(window.devicePixelRatio);
  let output = document.querySelector("#output");
  output.appendChild(renderer.domElement);
  return renderer;
}

function createScene() {
  return new THREE.Scene(); // keep tract of the 3D
}

function createCamera() {
  let camera = new THREE.PerspectiveCamera(
    45, // Field of view
    window.innerWidth / window.innerHeight, // Aspect Ratio
    0.1, // Near Value
    1000 // Far Value
  );
  camera.position.set(-30, 40, 30); // x, y, z
  // green - x
  // red - y
  // blue - z
  camera.lookAt(0, 0, 0); // to look at the computer
  return camera;
}

function createAxesHelper() {
  let axesHelper = new THREE.AxesHelper(40);
  return axesHelper;
}

function getRandomColor() {
  let colors = [
    "dodgerblue",
    "tomato",
    "limegreen",
    "rebeccapurple",
    "gold",
    "lavender",
    "lightcoral",
    "papayawhip",
  ];
  let randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function createCube() {
  // Geometry - The actual shape/skeleton of the object
  let geometry = new THREE.BoxGeometry(4, 4, 4); //width, height, depth
  // Material - The color/how it interacts with light
  let material = new THREE.MeshLambertMaterial({
    //lambert color reponse to light
    color: getRandomColor(),
  });
  // Create a mesh by combining the geometry and the material
  let mesh = new THREE.Mesh(geometry, material);
  // Return it so we can
  return mesh;
}

function createSphere() {
  // Geometry
  let geo = new THREE.SphereGeometry(4, 30, 30); // radius, width, height
  // Material
  let mat = new THREE.MeshLambertMaterial({
    color: getRandomColor(),
  });
  // Mesh
  let mesh = new THREE.Mesh(geo, mat);
  // Return the mesh
  return mesh;
}

function createLight() {
  let light = new THREE.PointLight("white", 1.2); // receive color and intensity
  return light;
}

function createLightHelper(light) {
  let helper = new THREE.PointLightHelper(light);
  return helper;
}

// callback
let renderer = createRenderer();
let scene = createScene();
let camera = createCamera();
let axesHelper = createAxesHelper();
let cube = createCube();
let sphere = createSphere();
let light = createLight();
let lightHelper = createLightHelper(light);

light.position.x = 10;
light.position.y = 10;
light.position.z = 10;

sphere.position.x = 20;

scene.add(axesHelper);
scene.add(cube, sphere, light, lightHelper);

renderer.render(scene, camera); // anytime make change have to make sure rerender

function animate() {
  light.position.x += 0.1;
  // cube.rotation.x -= 0.1;
  // cube.position.z -= 0.1; // move 10cm from the right everytime
  renderer.render(scene, camera);
  requestAnimationFrame(animate); // call animate as soon as you can
}

animate();
