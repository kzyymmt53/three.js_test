import './style.css'
import * as THREE from 'three';

//canvas
const canvas = document.querySelector("#webgl");

//scene
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const bgTexture = textureLoader.load("bg/bg.jpg");
scene.background = bgTexture;

//size
const sizes = {
  width: innerWidth,
  height: innerHeight,
}
//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/ sizes.height, 0.1, 1000);

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

//オブジェクト作成
const boxGeometory = new THREE.BoxGeometry(5, 5, 5, 10);
const boxMaterial = new THREE.MeshNormalMaterial();
const box = new THREE.Mesh(boxGeometory, boxMaterial);
scene.add(box);
box.position.set(0, 0.5, -15);
box.rotation.set(1,1,0);

const torusGeometory = new THREE.TorusGeometry(8, 2, 16, 100);
const torusMaterial = new THREE.MeshNormalMaterial();
const torus = new THREE.Mesh(torusGeometory, torusMaterial);
torus.position.set(0, 1, 10);
scene.add(torus);

const animationScripts = [];

animationScripts.push({
  start: 0,
  end: 40,
  function() {
    camera.lookAt(box.position);
    camera.position.set(0, 1, 10);
    box.position.z += 0.01;
  }
});

function playRollAnimation() {
  animationScripts.forEach((animation) => {
    if(scrollPercent > animation.start && scrollPercent < animation.end){
      animation.function();
    }
  });
}

//スクロール率
let scrollPercent = 0;
document.body.onscroll = () => {
  scrollPercent = (document.documentElement.scrollTop / (document.documentElement.scrollHeight
  - document.documentElement.clientHeight)) * 100;
}

//アニメーション
const tick = () => {
  window.requestAnimationFrame(tick);
  playRollAnimation();
  renderer.render(scene,camera);
}

tick();

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
});