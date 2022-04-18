import './style.css'
import * as THREE from "three";
import * as dat from "lil-gui";


const gui = new dat.GUI();
//キャンバス取得
const canvas = document.querySelector(".webgl");
//シーン
const scene = new THREE.Scene();

//サイズ
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}
const camera = new THREE.PerspectiveCamera(35,sizes.width/ sizes.height, 0.1, 100);
camera.position.z = 6;

scene.add(camera);

//レンダラー

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

//オブジェクト
//マテリアル
const material = new THREE.MeshPhysicalMaterial({color: "#3c94d7", metalness: 0.86, roughness: 0.37, flatShading: true,});

gui.addColor(material, "color");
gui.add(material, "metalness").min(0).max(1).step(0.01);
gui.add(material, "roughness").min(0).max(1).step(0.01);


//メッシュ
const mesh1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material);
const mesh2 = new THREE.Mesh(new THREE.OctahedronGeometry(), material);
const mesh3 = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16), material);
const mesh4 = new THREE.Mesh(new THREE.IcosahedronGeometry(), material);

mesh1.position.set(2,0,0);
mesh2.position.set(-1,0,0);
mesh3.position.set(2,0,-6);
mesh4.position.set(5,0,3);

scene.add(mesh1,mesh2,mesh3, mesh4);

const meshes = [mesh1, mesh2, mesh3, mesh4];

const directionalLight = new THREE.DirectionalLight("#ffffff", 4);
directionalLight.position.set(0.5,1,0);
scene.add(directionalLight);

//ブラウザのリサイズ操作
window.addEventListener("resize", () => {
 
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //レンダラーアップデート
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);

});

const clock = new THREE.Clock();

const animate = () => {
  renderer.render(scene,camera);

  let getDeltaTime = clock.getDelta();
  //meshを回転
  for(const mesh of meshes){
    mesh.rotation.x += 0.1 * getDeltaTime;
    mesh.rotation.y += 0.12 * getDeltaTime;
  }
  
  window.requestAnimationFrame(animate);
};

animate();

