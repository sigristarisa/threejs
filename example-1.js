import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.setZ(30);
camera.position.setX(-3);

const rings = [];
function createRings() {
  const geometry = new THREE.TorusGeometry(10, 0.25, 16, 100);
  const material = new THREE.MeshStandardMaterial({
    color: 0x61dbfb,
  });
  const torus = new THREE.Mesh(geometry, material);
  scene.add(torus);
  rings.push(torus);
}

Array(3).fill().forEach(createRings);

const geometryTwo = new THREE.SphereGeometry(2, 32, 16);
const materialTwo = new THREE.MeshStandardMaterial({
  color: 0x61dbfb,
});

const sphere = new THREE.Mesh(geometryTwo, materialTwo);
scene.add(sphere);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const topLight = new THREE.PointLight(0xffffff, 10, 0, 1);
topLight.position.set(8.5, 8.5, 8.5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(topLight, ambientLight);

function animate() {
  let i = 0;
  while (i < rings.length) {
    rings[i].rotation.x += 0.01 + i * 0.001;
    rings[i].rotation.y += 0.01 + i * 0.001;
    rings[i].rotation.z += 0.01 + i * 0.001;
    i++;
  }
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  sphere.rotation.z += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
