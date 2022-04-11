import * as THREE from 'three';
import { OrbitControls } from "./jsm/controls/OrbitControls.js"

let scene, camera, renderer, pointLight, controls;

window.addEventListener("load", init);

function init() {
    scene = new THREE.Scene();

    //カメラ追加
    camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth/ window.innerHeight,
        0.1,
    );
    camera.position.set(0, 0, +500);

    //レンダラー追加
    renderer = new THREE.WebGLRenderer({alpha: true});
    document.body.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    let texture = new THREE.TextureLoader().load("./textures/earth.jpg");

    //ジオメトリを作成
    let ballGeometory = new THREE.SphereGeometry(100, 64, 32);

    //マテリアルを作成
    let ballMaterial = new THREE.MeshPhysicalMaterial({map: texture});

    //メッシュ化
    let ballMesh = new THREE.Mesh(ballGeometory, ballMaterial);
    scene.add(ballMesh);

    //平行光源
    let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight);

    //ポイント光源
    pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(-200,-200,-200);
    scene.add(pointLight);

    //ポイント光源の場所の特定
    let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
    scene.add(pointLightHelper);

    //マウス操作ができるように
    controls = new OrbitControls(camera, renderer.domElement);

    window.addEventListener("resize", onWindowResize);
    animate();
}

//ブラウザのリサイズに対応
function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    //カメラのプロパティを変更したら実行する
    camera.updateProjectionMatrix();
}

function animate() {
    //ポイント光源
    pointLight.position.set(
        200 * Math.sin(Date.now() / 500),
        200 * Math.sin(Date.now() / 1000),
        200 * Math.cos(Date.now() / 500),
    );
    //レンダリング
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}






