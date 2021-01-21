import THREE, { WebGLRenderer, Scene, PerspectiveCamera, PointLight, AxesHelper, BoxGeometry, MeshNormalMaterial, Mesh } from 'three';
import OrbitControls from "three-orbitcontrols";

var width = window.innerWidth,
    height = window.innerHeight;

// Create a renderer and add it to the DOM.
var renderer = new WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
// Create the scene 
var scene = new Scene();
// Create a camera
var camera = new PerspectiveCamera(45, width / height, 0.1, 100);
camera.position.set(10,10,10);
camera.lookAt(0,0,0)

scene.add(camera);

// Add OrbitControls so that we can pan around with the mouse.
var controls = new OrbitControls(camera, renderer.domElement);

// Add axes
var axes = new AxesHelper(3);
scene.add(axes);

var geometry = new BoxGeometry(1, 1, 1);
var cubeMaterial = new MeshNormalMaterial();

var mesh = new Mesh(geometry, cubeMaterial);
scene.add(mesh);

resize();
update();
window.addEventListener('resize', resize);

function resize() {
    let w = window.innerWidth;
    let h = window.innerHeight;

    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
}

// Renders the scene
function update() {

    renderer.render(scene, camera);
    controls.update();

    requestAnimationFrame(update);
}