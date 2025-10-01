
// 場景設置
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('sky-container').appendChild(renderer.domElement);

// 創建漸層天空背景
const skyGeometry = new THREE.SphereGeometry(800, 32, 32);
const skyMaterial = new THREE.ShaderMaterial({
    uniforms: {
        topColor: { value: new THREE.Color(0x0077ff) },
        bottomColor: { value: new THREE.Color(0x87CEEB) },
        offset: { value: 33 },
        exponent: { value: 0.6 }
    },
    vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
            float h = normalize(vWorldPosition + offset).y;
            gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
    `,
    side: THREE.BackSide
});
const sky = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(sky);

// 創建卡通風格雲朵
function createCloud() {
    const cloud = new THREE.Group();
    const cloudMaterial = new THREE.MeshLambertMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.95
    });
    
    // 主要雲朵體 - 更大更蓬鬆
    const mainGeometry = new THREE.SphereGeometry(25, 16, 12);
    const mainSphere = new THREE.Mesh(mainGeometry, cloudMaterial);
    mainSphere.scale.set(1.5, 1, 1.2);
    cloud.add(mainSphere);
    
    // 添加更多球體創造蓬鬆效果
    for (let i = 0; i < 12; i++) {
        const size = Math.random() * 18 + 12;
        const geometry = new THREE.SphereGeometry(size, 12, 8);
        const sphere = new THREE.Mesh(geometry, cloudMaterial);
        
        const angle = (i / 12) * Math.PI * 2;
        const radius = 20 + Math.random() * 15;
        sphere.position.x = Math.cos(angle) * radius + (Math.random() - 0.5) * 20;
        sphere.position.y = (Math.random() - 0.5) * 25;
        sphere.position.z = Math.sin(angle) * radius + (Math.random() - 0.5) * 15;
        
        const scale = Math.random() * 0.6 + 0.4;
        sphere.scale.set(scale, scale * 0.8, scale);
        
        cloud.add(sphere);
    }
    
    return cloud;
}

// 創建多朵雲 - 分層放置
const clouds = [];
for (let i = 0; i < 12; i++) {
    const cloud = createCloud();
    
    // 分成前景、中景、背景三層
    const layer = i % 3;
    const zPos = layer === 0 ? -50 : layer === 1 ? -150 : -250;
    const scale = layer === 0 ? 1.2 : layer === 1 ? 0.8 : 0.6;
    
    cloud.position.set(
        Math.random() * 1000 - 500,
        Math.random() * 150 - 50,
        zPos + Math.random() * 50
    );
    
    cloud.scale.set(scale, scale, scale);
    cloud.userData = {
        speed: (Math.random() * 0.15 + 0.05) * (2 - scale),
        originalY: cloud.position.y,
        floatOffset: Math.random() * Math.PI * 2
    };
    
    clouds.push(cloud);
    scene.add(cloud);
}

// 光照設置 - 更柔和的光線
const ambientLight = new THREE.AmbientLight(0x87CEEB, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(100, 100, 50);
directionalLight.castShadow = false;
scene.add(directionalLight);

// 添加溫暖的側光
const sideLight = new THREE.DirectionalLight(0xfff8dc, 0.3);
sideLight.position.set(-50, 30, 100);
scene.add(sideLight);

// 相機位置
camera.position.z = 100;

// 動畫循環
function animate() {
    requestAnimationFrame(animate);
    
    // 移動雲朵
    clouds.forEach(cloud => {
        cloud.position.x -= cloud.userData.speed;
        
        // 當雲朵移出視野時，重新定位到右側
        if (cloud.position.x < -600) {
            cloud.position.x = 600;
            cloud.position.y = cloud.userData.originalY + (Math.random() - 0.5) * 100;
        }
        
        // 更自然的上下浮動
        const time = Date.now() * 0.0005;
        cloud.position.y = cloud.userData.originalY + 
            Math.sin(time + cloud.userData.floatOffset) * 8 +
            Math.sin(time * 0.7 + cloud.userData.floatOffset * 1.3) * 4;
        
        // 輕微旋轉
        cloud.rotation.y += 0.001;
    });
    
    renderer.render(scene, camera);
}

// 響應式設計
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

// 開始動畫
animate();
