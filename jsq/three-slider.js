/**
 * ExplosionSlider based on slide3.html
 * Encapsulated for reusability in service_7-1.html
 */

class ExplosionSlider {
    constructor(containerId, images) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container ${containerId} not found`);
            return;
        }
        this.images = images;
        this.currentIndex = 0;
        this.isAnimating = false;
        
        this.init();
        this.animate();
        this.handleResize();
    }

    init() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        // Scene Setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.updateCameraZ(width, height);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        // Load Textures
        const textureLoader = new THREE.TextureLoader();
        this.textures = this.images.map(url => textureLoader.load(url));

        // Geometry (40x25 as per slide3 reference, adjust if needed)
        // Increasing segments for smoother explosion
        this.geometry = this.createExplosionGeometry(40, 25, 30, 20);

        // Shaders
        const vertexShader = `
            uniform float uProgress;
            uniform float uTime;
            attribute vec3 aCenter;
            attribute vec3 aRandom;
            varying vec2 vUv;

            mat4 rotationMatrix(vec3 axis, float angle) {
                axis = normalize(axis);
                float s = sin(angle);
                float c = cos(angle);
                float oc = 1.0 - c;
                return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                            oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                            oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                            0.0,                                0.0,                                0.0,                                1.0);
            }

            void main() {
                vUv = uv;
                float prog = uProgress;
                vec3 pos = position - aCenter; 
                float rotAngle = prog * aRandom.y * 10.0; 
                mat4 rotMat = rotationMatrix(vec3(aRandom.x, aRandom.y, 1.0), rotAngle);
                pos = (rotMat * vec4(pos, 1.0)).xyz;
                vec3 dir = normalize(aCenter); 
                dir.z += aRandom.z * 2.0; 
                pos += aCenter + dir * prog * 30.0 * aRandom.x; 
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `;

        const fragmentShader = `
            uniform sampler2D uTexture;
            varying vec2 vUv;
            void main() {
                vec4 color = texture2D(uTexture, vUv);
                gl_FragColor = color;
            }
        `;

        // Materials & Meshes
        this.material1 = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uProgress: { value: 0 },
                uTexture: { value: this.textures[0] }
            },
            side: THREE.DoubleSide,
            transparent: true
        });

        this.material2 = this.material1.clone();
        this.material2.uniforms.uTexture.value = this.textures[1] || this.textures[0];
        this.material2.uniforms.uProgress.value = 1;

        this.mesh1 = new THREE.Mesh(this.geometry, this.material1);
        this.mesh2 = new THREE.Mesh(this.geometry, this.material2);
        
        this.mesh2.position.z = -10;
        this.mesh2.visible = false;

        this.scene.add(this.mesh1);
        this.scene.add(this.mesh2);

        this.activeMesh = this.mesh1;
        this.nextMesh = this.mesh2;
    }

    createExplosionGeometry(width, height, segmentsW, segmentsH) {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const uvs = [];
        const centers = [];
        const randoms = [];

        const widthHalf = width / 2;
        const heightHalf = height / 2;
        const segmentWidth = width / segmentsW;
        const segmentHeight = height / segmentsH;

        const addTriangle = (x1, y1, x2, y2, x3, y3, uv1x, uv1y, uv2x, uv2y, uv3x, uv3y) => {
            vertices.push(x1, y1, 0, x2, y2, 0, x3, y3, 0);
            uvs.push(uv1x, uv1y, uv2x, uv2y, uv3x, uv3y);
            const cx = (x1 + x2 + x3) / 3;
            const cy = (y1 + y2 + y3) / 3;
            centers.push(cx, cy, 0, cx, cy, 0, cx, cy, 0);
            const r1 = Math.random();
            const r2 = Math.random();
            const r3 = Math.random();
            randoms.push(r1, r2, r3, r1, r2, r3, r1, r2, r3);
        };

        for (let i = 0; i < segmentsW; i++) {
            for (let j = 0; j < segmentsH; j++) {
                const x = (i * segmentWidth) - widthHalf;
                const y = (j * segmentHeight) - heightHalf;
                const u = i / segmentsW;
                const v = j / segmentsH;
                const uNext = (i + 1) / segmentsW;
                const vNext = (j + 1) / segmentsH;

                addTriangle(
                    x, y, x + segmentWidth, y, x, y + segmentHeight,
                    u, v, uNext, v, u, vNext
                );
                addTriangle(
                    x + segmentWidth, y, x + segmentWidth, y + segmentHeight, x, y + segmentHeight,
                    uNext, v, uNext, vNext, u, vNext
                );
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        geometry.setAttribute('aCenter', new THREE.Float32BufferAttribute(centers, 3));
        geometry.setAttribute('aRandom', new THREE.Float32BufferAttribute(randoms, 3));

        return geometry;
    }

    goToSlide(index) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const nextIndex = (index + this.images.length) % this.images.length;
        
        this.nextMesh.material.uniforms.uTexture.value = this.textures[nextIndex];
        this.nextMesh.material.uniforms.uProgress.value = 1;
        this.nextMesh.position.z = -5;
        this.nextMesh.visible = true;

        // Current mesh explodes
        gsap.to(this.activeMesh.material.uniforms.uProgress, {
            value: 1,
            duration: 1.5,
            ease: "power2.inOut"
        });
        gsap.to(this.activeMesh.position, {
            z: 10,
            duration: 1.5,
            ease: "power2.inOut"
        });

        // Next mesh assembles
        gsap.to(this.nextMesh.material.uniforms.uProgress, {
            value: 0,
            duration: 1.5,
            ease: "power2.inOut"
        });
        gsap.to(this.nextMesh.position, {
            z: 0,
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
                this.isAnimating = false;
                this.activeMesh.visible = false;
                
                // Swap
                const temp = this.activeMesh;
                this.activeMesh = this.nextMesh;
                this.nextMesh = temp;
                
                this.currentIndex = nextIndex;
            }
        });
    }

    next() {
        this.goToSlide(this.currentIndex + 1);
    }

    prev() {
        this.goToSlide(this.currentIndex - 1);
    }

    updateCameraZ(width, height) {
        const aspect = width / height;
        const vFOV = (this.camera.fov * Math.PI) / 180;
        const targetWidth = 40; // The width of our geometry
        // Make the image occupy 85% of the viewport width
        // Formula: z = (targetWidth / percentage) / (2 * tan(vFOV/2) * aspect)
        this.camera.position.z = (targetWidth / 0.85) / (2 * Math.tan(vFOV / 2) * aspect);
    }

    handleResize() {
        window.addEventListener('resize', () => {
            if (!this.container) return;
            const width = this.container.clientWidth;
            const height = this.container.clientHeight;
            this.camera.aspect = width / height;
            this.updateCameraZ(width, height);
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        });
    }

    animate() {
        // Use arrow function to bind 'this'
        const loop = () => {
            requestAnimationFrame(loop);
            this.renderer.render(this.scene, this.camera);
        };
        loop();
    }
}
