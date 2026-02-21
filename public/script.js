// Project
// Name: Chaudhry Sadiq
// Student ID: 645 931
// Description: Interactive 3D Bouncing Ball with Custom Texture Mapping
// Date: 12/04/2025

// Helper Functions
function showError(message) {
  const errorEl = document.createElement("div");
  errorEl.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    background: rgba(255,0,0,0.7);
    padding: 15px;
    font-family: Arial;
    z-index: 100;
    border-radius: 5px;
    max-width: 80%;
    text-align: center;
    animation: fadeOut 3s forwards;
  `;
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeOut {
      0% { opacity: 1; }
      70% { opacity: 1; }
      100% { opacity: 0; visibility: hidden; }
    }
  `;
  document.head.appendChild(style);
  errorEl.textContent = message;
  document.body.appendChild(errorEl);
  setTimeout(() => {
    if (errorEl.parentNode) {
      errorEl.parentNode.removeChild(errorEl);
    }
    if (style.parentNode) {
      style.parentNode.removeChild(style);
    }
  }, 3000);
  console.error(message);
}

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const errorType = type === gl.VERTEX_SHADER ? "VERTEX" : "FRAGMENT";
    showError(`${errorType} SHADER ERROR:\n${gl.getShaderInfoLog(shader)}`);
    return null;
  }
  return shader;
}

function createProgram(gl, vertexSrc, fragmentSrc) {
  const program = gl.createProgram();
  const vShader = compileShader(gl, gl.VERTEX_SHADER, vertexSrc);
  const fShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);
  if (!vShader || !fShader) return null;
  gl.attachShader(program, vShader);
  gl.attachShader(program, fShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    showError(`PROGRAM LINKING ERROR:\n${gl.getProgramInfoLog(program)}`);
    return null;
  }
  return program;
}

// Loading Screen Implementation
const loadingScreen = document.getElementById("loading-screen");
const loadingBar = document.getElementById("loading-bar");
const startLoadingBtn = document.getElementById("start-loading-btn");

function simulateLoading() {
  let progress = 0;
  const totalSteps = 100;
  const interval = setInterval(() => {
    progress += 1;
    loadingBar.style.width = `${progress}%`;
    
    if (progress >= 100) {
      clearInterval(interval);
      loadingComplete();
    }
  }, 30);
}

function loadingComplete() {
  startLoadingBtn.style.display = "block";
  startLoadingBtn.addEventListener("click", () => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
      initWebGL();
    }, 500);
  });
}

// Initialize WebGL after loading screen
function initWebGL() {
  // WebGL Initialization
  const canvas = document.getElementById("glCanvas");
  const gl = canvas.getContext("webgl2", { antialias: true });
  if (!gl) {
    showError("WebGL2 not supported in your browser!");
    throw new Error("WebGL2 not available");
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Audio On Contact With Walls
  const bounceSounds = [
    new Audio("bounce1.mp3"),
    new Audio("bounce2.mp3"),
    new Audio("bounce3.mp3")
  ];

  bounceSounds.forEach(sound => {
    sound.volume = 0.3;
  });

  function playBounceSound() {
    const availableSound = bounceSounds.find(sound => sound.paused);
    if (availableSound) {
      availableSound.currentTime = 0;
      availableSound.play().catch(e => console.log("Audio play error:", e));
    }
  }

  // Interaction State
  const interaction = {
    isDragging: false,
    isGrabbingSphere: false,
    lastX: 0,
    lastY: 0,
    rotationX: 0,
    rotationY: 0,
    zoom: -3.0,
    starRotationX: 0,
    starRotationY: 0,
    lastTime: performance.now(),
    velocityX: 0,
    velocityY: 0,
    sphereVelocity: [0, 0, 0],
    decay: 0.95,
    sensitivity: 2.5,
    position: [0, 0, 0],
    speed: [0.03, 0.02, 0.01],
    originalSpeed: [0.03, 0.02, 0.01],
    bounds: 1.5,
    speedMultiplier: 1.0,
    isBouncing: true,
    lastBounceTime: 0,
    bounceCooldown: 100
  };

  document.getElementById("speed-slider").addEventListener("input", (e) => {
    interaction.speedMultiplier = parseFloat(e.target.value);
    interaction.originalSpeed = [
      0.03 * interaction.speedMultiplier,
      0.02 * interaction.speedMultiplier,
      0.01 * interaction.speedMultiplier
    ];
    if (!interaction.isGrabbingSphere) {
      interaction.speed = [...interaction.originalSpeed];
    }
  });

  document.getElementById("start-btn").addEventListener("click", () => {
    interaction.isBouncing = true;
    interaction.speed = [...interaction.originalSpeed];
  });

  document.getElementById("stop-btn").addEventListener("click", () => {
    interaction.isBouncing = false;
    interaction.position = [0, 0, 0];
    interaction.speed = [0, 0, 0];
  });

  // Mouse events
  canvas.addEventListener("mousedown", (e) => {
    interaction.isDragging = true;
    interaction.isGrabbingSphere = true;
    interaction.lastX = e.clientX;
    interaction.lastY = e.clientY;
    interaction.velocityX = 0;
    interaction.velocityY = 0;
    interaction.sphereVelocity = [...interaction.speed];
    canvas.style.cursor = "grabbing";
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!interaction.isDragging) return;
    
    const now = performance.now();
    const deltaTime = now - interaction.lastTime;
    interaction.lastTime = now;
    
    const dx = e.clientX - interaction.lastX;
    const dy = e.clientY - interaction.lastY;
    
    if (interaction.isGrabbingSphere) {
      interaction.position[0] += dx * 0.01;
      interaction.position[1] -= dy * 0.01;
      
      if (deltaTime > 0) {
        interaction.sphereVelocity[0] = dx * 0.01 / deltaTime * 1000;
        interaction.sphereVelocity[1] = -dy * 0.01 / deltaTime * 1000;
      }
    } else {
      interaction.velocityX = dx * 0.005 * (60 / deltaTime) * interaction.sensitivity;
      interaction.velocityY = dy * 0.005 * (60 / deltaTime) * interaction.sensitivity;
      interaction.rotationY += interaction.velocityX;
      interaction.rotationX += interaction.velocityY;
      interaction.starRotationY += interaction.velocityX * 0.3;
      interaction.starRotationX += interaction.velocityY * 0.3;
    }
    
    interaction.lastX = e.clientX;
    interaction.lastY = e.clientY;
  });

  canvas.addEventListener("mouseup", () => {
    if (interaction.isGrabbingSphere) {
      interaction.speed = [
        interaction.sphereVelocity[0] || interaction.originalSpeed[0],
        interaction.sphereVelocity[1] || interaction.originalSpeed[1],
        interaction.originalSpeed[2]
      ];
    }
    interaction.isDragging = false;
    interaction.isGrabbingSphere = false;
    canvas.style.cursor = "grab";
  });

  canvas.addEventListener("mouseleave", () => {
    if (interaction.isGrabbingSphere) {
      interaction.speed = [
        interaction.sphereVelocity[0] || interaction.originalSpeed[0],
        interaction.sphereVelocity[1] || interaction.originalSpeed[1],
        interaction.originalSpeed[2]
      ];
    }
    interaction.isDragging = false;
    interaction.isGrabbingSphere = false;
    canvas.style.cursor = "grab";
  });

  canvas.addEventListener(
    "wheel",
    (e) => {
      interaction.zoom += e.deltaY * 0.01;
      interaction.zoom = Math.max(-5, Math.min(-1, interaction.zoom));
      e.preventDefault();
    },
    { passive: false }
  );

  // Shader Sources
  const fragmentShaderSource = `#version 300 es
precision highp float;
in vec3 vNormal;
in vec3 vPosition;
out vec4 fragColor;
uniform vec3 lightPosition;
uniform float bassFactor;
uniform float glow;
void main() {
  vec3 baseColor = vec3(0.8, 0.1, 0.1);
  float dynamicIntensity = 1.0 + bassFactor * 0.5;
  vec3 lightColor = vec3(1.0) * dynamicIntensity;
  float ambientStrength = 0.3;
  float specularStrength = 0.5;
  vec3 ambient = ambientStrength * lightColor;
  vec3 norm = normalize(vNormal);
  vec3 lightDir = normalize(lightPosition - vPosition);
  float diff = max(dot(norm, lightDir), 0.0);
  vec3 diffuse = diff * lightColor;
  vec3 viewDir = normalize(-vPosition);
  vec3 reflectDir = reflect(-lightDir, norm);
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
  vec3 specular = specularStrength * spec * lightColor;
  vec3 result = (ambient + diffuse + specular) * baseColor;
  result += glow * baseColor * 0.1;
  float edgeGlow = pow(0.7 - abs(dot(norm, normalize(viewDir))), 2.0);
  result += edgeGlow * baseColor * 0.2;
  fragColor = vec4(result, 1.0);
}`;

  const vertexShaderSource = `#version 300 es
in vec3 position;
in vec3 normal;
uniform mat4 mvpMatrix;
uniform mat4 modelMatrix;
uniform float beatPulse;
uniform float avgFreq;
uniform float time;
out vec3 vNormal;
out vec3 vPosition;
void main() {
  float wave1 = sin((position.x + position.y + position.z) * 7.0 + time) * (0.35 * avgFreq);
  float wave2 = sin((position.x - position.y) * 7.0 + time * 0.5 + beatPulse * 3.14) * (0.35 * avgFreq);
  float wave = (wave1 + wave2) * beatPulse;
  vec3 newPos = position + normal * wave;
  vNormal = mat3(modelMatrix) * normal;
  vPosition = vec3(modelMatrix * vec4(newPos, 1.0));
  gl_Position = mvpMatrix * vec4(newPos, 1.0);
}`;

  const texturedFragmentShaderSource = `#version 300 es
precision highp float;
in vec3 vNormal;
in vec3 vPosition;
in vec2 vTexCoord;
out vec4 fragColor;
uniform sampler2D uTexture;
uniform vec3 lightPosition;
uniform float bassFactor;
uniform float glow;
void main() {
  vec3 textureColor = texture(uTexture, vTexCoord).rgb;
  vec3 baseColor = textureColor;
  float dynamicIntensity = 1.0 + bassFactor * 0.5;
  vec3 lightColor = vec3(1.0) * dynamicIntensity;
  float ambientStrength = 0.3;
  float specularStrength = 0.5;
  vec3 ambient = ambientStrength * lightColor;
  vec3 norm = normalize(vNormal);
  vec3 lightDir = normalize(lightPosition - vPosition);
  float diff = max(dot(norm, lightDir), 0.0);
  vec3 diffuse = diff * lightColor;
  vec3 viewDir = normalize(-vPosition);
  vec3 reflectDir = reflect(-lightDir, norm);
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
  vec3 specular = specularStrength * spec * lightColor;
  vec3 result = (ambient + diffuse + specular) * baseColor;
  result += glow * textureColor * 0.1;
  float edgeGlow = pow(0.7 - abs(dot(norm, normalize(viewDir))), 2.0);
  result += edgeGlow * baseColor * 0.2;
  fragColor = vec4(result, 1.0);
}`;

  const texturedVertexShaderSource = `#version 300 es
in vec3 position;
in vec3 normal;
in vec2 texCoord;
uniform mat4 mvpMatrix;
uniform mat4 modelMatrix;
uniform float beatPulse;
uniform float avgFreq;
uniform float time;
out vec3 vNormal;
out vec3 vPosition;
out vec2 vTexCoord;
void main() {
  float wave1 = sin((position.x + position.y + position.z) * 7.0 + time) * (0.35 * avgFreq);
  float wave2 = sin((position.x - position.y) * 7.0 + time * 0.5 + beatPulse * 3.14) * (0.35 * avgFreq);
  float wave = (wave1 + wave2) * beatPulse;
  vec3 newPos = position + normal * wave;
  vNormal = mat3(modelMatrix) * normal;
  vPosition = vec3(modelMatrix * vec4(newPos, 1.0));
  vTexCoord = texCoord;
  gl_Position = mvpMatrix * vec4(newPos, 1.0);
}`;

  const starVertexShaderSource = `#version 300 es
in vec3 position;
in vec3 color;
in float size;
uniform mat4 viewProjection;
uniform mat4 rotationMatrix;
out vec3 vColor;
void main() {
  gl_Position = viewProjection * rotationMatrix * vec4(position, 1.0);
  gl_PointSize = size;
  vColor = color;
}`;

  const starFragmentShaderSource = `#version 300 es
precision highp float;
in vec3 vColor;
out vec4 fragColor;
void main() {
  fragColor = vec4(vColor, 1.0);
}`;

  // Geometry Generation
  function generateDiamondWireframeSphere(radius, segments) {
    const vertices = [];
    const normals = [];
    const indices = [];
    for (let lat = 0; lat <= segments; lat++) {
      const theta = lat * Math.PI / segments;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      for (let lon = 0; lon <= segments; lon++) {
        const phi = lon * 2 * Math.PI / segments;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
        const x = cosPhi * sinTheta;
        const y = cosTheta;
        const z = sinPhi * sinTheta;
        vertices.push(radius * x, radius * y, radius * z);
        normals.push(x, y, z);
      }
    }
    for (let lat = 0; lat < segments; lat++) {
      for (let lon = 0; lon < segments; lon++) {
        const first = (lat * (segments + 1)) + lon;
        const second = first + segments + 1;
        indices.push(first, second, first + 1);
        indices.push(second, second + 1, first + 1);
      }
    }
    return { vertices, normals, indices };
  }

  function generateTexturedSphere(radius, segments) {
    const vertices = [], normals = [], texCoords = [], indices = [];
    for (let lat = 0; lat <= segments; lat++) {
      const theta = lat * Math.PI / segments;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      for (let lon = 0; lon <= segments; lon++) {
        const phi = lon * 2 * Math.PI / segments;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
        const x = cosPhi * sinTheta;
        const y = cosTheta;
        const z = sinPhi * sinTheta;
        vertices.push(radius * x, radius * y, radius * z);
        normals.push(x, y, z);
        texCoords.push(lon / segments, lat / segments);
      }
    }
    for (let lat = 0; lat < segments; lat++) {
      for (let lon = 0; lon < segments; lon++) {
        const first = (lat * (segments + 1)) + lon;
        const second = first + segments + 1;
        indices.push(first, second, first + 1);
        indices.push(second, second + 1, first + 1);
      }
    }
    return { vertices, normals, texCoords, indices };
  }

  // Buffer Creation
  function createBuffer(gl, target, data, usage) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(target, buffer);
    gl.bufferData(target, data, usage);
    return buffer;
  }

  const sphere = generateDiamondWireframeSphere(0.7, 66);
  const indexCount = sphere.indices ? sphere.indices.length : 0;
  const positionBuffer = createBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(sphere.vertices), gl.STATIC_DRAW);
  const normalBuffer = createBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(sphere.normals), gl.STATIC_DRAW);
  const indexBuffer = createBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sphere.indices), gl.STATIC_DRAW);

  const texturedSphere = generateTexturedSphere(0.7, 66);
  const texPositionBuffer = createBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(texturedSphere.vertices), gl.STATIC_DRAW);
  const texNormalBuffer = createBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(texturedSphere.normals), gl.STATIC_DRAW);
  const texCoordBuffer = createBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(texturedSphere.texCoords), gl.STATIC_DRAW);
  const texIndexBuffer = createBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(texturedSphere.indices), gl.STATIC_DRAW);
  const texIndexCount = texturedSphere.indices.length;

  function createStarfield(gl) {
    const positions = [];
    const colors = [];
    const sizes = [];
    for (let i = 0; i < 1000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 10.0;
      positions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      const intensity = Math.random() * 0.5 + 0.5;
      colors.push(intensity, intensity, intensity);
      sizes.push(Math.random() * 2 + 1);
    }
    return {
      positionBuffer: createBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW),
      colorBuffer: createBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW),
      sizeBuffer: createBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(sizes), gl.STATIC_DRAW),
      count: positions.length / 3,
    };
  }
  const starfield = createStarfield(gl);

  // Shader Programs
  const wireframeProgram = createProgram(gl, vertexShaderSource, fragmentShaderSource);
  if (!wireframeProgram) {
    throw new Error("Wireframe shader program creation failed");
  }
  const texturedProgram = createProgram(gl, texturedVertexShaderSource, texturedFragmentShaderSource);
  if (!texturedProgram) {
    throw new Error("Textured shader program creation failed");
  }
  const starProgram = createProgram(gl, starVertexShaderSource, starFragmentShaderSource);
  if (!starProgram) {
    throw new Error("Star shader program creation failed");
  }

  // Particle System Setup
  let particles = [];
  const particlePositionsBuffer = gl.createBuffer();
  const particleColorsBuffer = gl.createBuffer();
  const particleSizeBuffer = gl.createBuffer();
  let lastSpawnTime = 0;
  function spawnParticles() {
    const count = 2;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const vz = (Math.random() - 0.5) * 0.2;
      const speed = Math.random() * 0.2 + 0.4;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      particles.push({
        position: [0, 0, 0],
        velocity: [vx, vy, vz],
        life: 5.0,
      });
    }
  }

  // Texture Upload Setup
  const textureUpload = document.getElementById("texture-upload");
  const uploadTextureBtn = document.getElementById("upload-texture-btn");
  let texturedSphereTexture = null;
  uploadTextureBtn.addEventListener("click", () => {
    textureUpload.click();
  });
  textureUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      img.onload = function() {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.generateMipmap(gl.TEXTURE_2D);
        texturedSphereTexture = texture;
        showError(`Texture loaded: ${file.name}`);
      };
      img.src = URL.createObjectURL(file);
    }
  });

  // Utility Math functions
  function radians(degrees) {
    return (degrees * Math.PI) / 180.0;
  }
  function translate(x, y, z) {
    const m = mat4();
    m[0][3] = x;
    m[1][3] = y;
    m[2][3] = z;
    return m;
  }
  function rotateX(theta) {
    const c = Math.cos(radians(theta));
    const s = Math.sin(radians(theta));
    return mat4(
      1, 0, 0, 0,
      0, c, -s, 0,
      0, s, c, 0,
      0, 0, 0, 1
    );
  }
  function rotateY(theta) {
    const c = Math.cos(radians(theta));
    const s = Math.sin(radians(theta));
    return mat4(
      c, 0, s, 0,
      0, 1, 0, 0,
      -s, 0, c, 0,
      0, 0, 0, 1
    );
  }
  function perspective(fovy, aspect, near, far) {
    const f = 1.0 / Math.tan(radians(fovy) / 2);
    const d = far - near;
    const m = mat4();
    m[0][0] = f / aspect;
    m[1][1] = f;
    m[2][2] = -(near + far) / d;
    m[2][3] = (-2 * near * far) / d;
    m[3][2] = -1;
    m[3][3] = 0;
    return m;
  }
  function mat4(...args) {
    if (args.length === 0) {
      return [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ];
    }
    if (args.length === 16) {
      return [
        [args[0], args[1], args[2], args[3]],
        [args[4], args[5], args[6], args[7]],
        [args[8], args[9], args[10], args[11]],
        [args[12], args[13], args[14], args[15]],
      ];
    }
  }
  function mult(a, b) {
    const result = mat4();
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        result[i][j] = 0;
        for (let k = 0; k < 4; k++) {
          result[i][j] += a[i][k] * b[k][j];
        }
      }
    }
    return result;
  }
  function flatten(m) {
    const out = [];
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 4; i++) {
        out.push(m[i][j]);
      }
    }
    return new Float32Array(out);
  }

  let beatPulse = 0.0;
  const startTime = performance.now();

  function render() {
    try {
      const now = performance.now();
      const dt = (now - interaction.lastTime) / 1000.0;
      interaction.lastTime = now;

      // Update sphere position based on current speed
      if (interaction.isBouncing && !interaction.isGrabbingSphere) {
        interaction.position[0] += interaction.speed[0];
        interaction.position[1] += interaction.speed[1];
        interaction.position[2] += interaction.speed[2];

        // Bounce off walls
        for (let i = 0; i < 3; i++) {
          if (Math.abs(interaction.position[i]) > interaction.bounds) {
            interaction.speed[i] *= -0.98;
            interaction.speed[(i + 1) % 3] *= 0.99 + Math.random() * 0.02;
            interaction.speed[(i + 2) % 3] *= 0.99 + Math.random() * 0.02;
            
            // Play bounce sound with cooldown
            if (now - interaction.lastBounceTime > interaction.bounceCooldown) {
              playBounceSound();
              interaction.lastBounceTime = now;
            }
          }
        }
      }

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      if (!interaction.isDragging) {
        interaction.velocityX *= interaction.decay;
        interaction.velocityY *= interaction.decay;
        interaction.rotationY += interaction.velocityX;
        interaction.rotationX += interaction.velocityY;
        interaction.starRotationY += interaction.velocityX * 0.3;
        interaction.starRotationX += interaction.velocityY * 0.3;
      }

      let bassFactor = 0.0;
      let avgFreq = 0.0;
      beatPulse = 0.0;
      let glowActive = 0.0;

      if (bassFactor > 0.5 && (now - lastSpawnTime) > 30) {
        spawnParticles();
        lastSpawnTime = now;
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.position[0] += p.velocity[0] * dt * interaction.speedMultiplier;
        p.position[1] += p.velocity[1] * dt * interaction.speedMultiplier;
        p.position[2] += p.velocity[2] * dt * interaction.speedMultiplier;
        p.life -= dt;
        const dist = Math.sqrt(p.position[0]**2 + p.position[1]**2 + p.position[2]**2);
        if (p.life <= 0 || dist > 1.7) {
          particles.splice(i, 1);
        }
      }

      const timeElapsed = (performance.now() - startTime) / 1000.0;
      let view = translate(0, 0, interaction.zoom);
      let projection = perspective(60, canvas.width / canvas.height, 0.1, 100);
      let viewProjection = mult(projection, view);

      gl.useProgram(starProgram);
      let starRotation = mat4();
      starRotation = mult(starRotation, rotateY(interaction.starRotationY));
      starRotation = mult(starRotation, rotateX(interaction.starRotationX));
      gl.bindBuffer(gl.ARRAY_BUFFER, starfield.positionBuffer);
      const positionLoc = gl.getAttribLocation(starProgram, "position");
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, starfield.colorBuffer);
      const colorLoc = gl.getAttribLocation(starProgram, "color");
      gl.enableVertexAttribArray(colorLoc);
      gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, starfield.sizeBuffer);
      const sizeLoc = gl.getAttribLocation(starProgram, "size");
      gl.enableVertexAttribArray(sizeLoc);
      gl.vertexAttribPointer(sizeLoc, 1, gl.FLOAT, false, 0, 0);
      gl.uniformMatrix4fv(
        gl.getUniformLocation(starProgram, "viewProjection"),
        false,
        flatten(viewProjection)
      );
      gl.uniformMatrix4fv(
        gl.getUniformLocation(starProgram, "rotationMatrix"),
        false,
        flatten(starRotation)
      );
      gl.drawArrays(gl.POINTS, 0, starfield.count);

      if (particles.length > 0) {
        let particlePositions = [];
        let particleSizes = [];
        let particleColors = [];
        for (let p of particles) {
          particlePositions.push(...p.position);
          particleSizes.push(1.6);
          particleColors.push(1.0, 1.0, 1.0);
        }
        gl.useProgram(starProgram);
        gl.bindBuffer(gl.ARRAY_BUFFER, particlePositionsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(particlePositions), gl.DYNAMIC_DRAW);
        const posLocParticles = gl.getAttribLocation(starProgram, "position");
        gl.enableVertexAttribArray(posLocParticles);
        gl.vertexAttribPointer(posLocParticles, 3, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, particleColorsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(particleColors), gl.DYNAMIC_DRAW);
        const colLocParticles = gl.getAttribLocation(starProgram, "color");
        gl.enableVertexAttribArray(colLocParticles);
        gl.vertexAttribPointer(colLocParticles, 3, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, particleSizeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(particleSizes), gl.DYNAMIC_DRAW);
        const sizeLocParticles2 = gl.getAttribLocation(starProgram, "size");
        gl.enableVertexAttribArray(sizeLocParticles2);
        gl.vertexAttribPointer(sizeLocParticles2, 1, gl.FLOAT, false, 0, 0);
        
        gl.uniformMatrix4fv(
          gl.getUniformLocation(starProgram, "viewProjection"),
          false,
          flatten(viewProjection)
        );
        gl.uniformMatrix4fv(
          gl.getUniformLocation(starProgram, "rotationMatrix"),
          false,
          flatten(mat4())
        );
        
        gl.drawArrays(gl.POINTS, 0, particles.length);
      }

      let model = mat4();
      model = mult(model, translate(interaction.position[0], interaction.position[1], interaction.position[2]));
      model = mult(model, rotateY(interaction.rotationY));
      model = mult(model, rotateX(interaction.rotationX));
      let mvp = mult(viewProjection, model);

      if (texturedSphereTexture) {
        gl.useProgram(texturedProgram);
        gl.uniformMatrix4fv(gl.getUniformLocation(texturedProgram, "mvpMatrix"), false, flatten(mvp));
        gl.uniformMatrix4fv(gl.getUniformLocation(texturedProgram, "modelMatrix"), false, flatten(model));
        gl.uniform1f(gl.getUniformLocation(texturedProgram, "beatPulse"), beatPulse);
        gl.uniform1f(gl.getUniformLocation(texturedProgram, "avgFreq"), avgFreq);
        gl.uniform1f(gl.getUniformLocation(texturedProgram, "time"), timeElapsed);
        gl.uniform1f(gl.getUniformLocation(texturedProgram, "bassFactor"), bassFactor);
        gl.uniform1f(gl.getUniformLocation(texturedProgram, "glow"), glowActive);
        const lightPosition = [3.0, 3.0, 3.0];
        gl.uniform3fv(gl.getUniformLocation(texturedProgram, "lightPosition"), lightPosition);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, texPositionBuffer);
        const posLoc = gl.getAttribLocation(texturedProgram, "position");
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, texNormalBuffer);
        const normalLoc = gl.getAttribLocation(texturedProgram, "normal");
        gl.enableVertexAttribArray(normalLoc);
        gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        const texCoordLoc = gl.getAttribLocation(texturedProgram, "texCoord");
        gl.enableVertexAttribArray(texCoordLoc);
        gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, texIndexBuffer);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texturedSphereTexture);
        gl.uniform1i(gl.getUniformLocation(texturedProgram, "uTexture"), 0);
        
        gl.drawElements(gl.TRIANGLES, texIndexCount, gl.UNSIGNED_SHORT, 0);
      } else {
        gl.useProgram(wireframeProgram);
        gl.uniformMatrix4fv(gl.getUniformLocation(wireframeProgram, "mvpMatrix"), false, flatten(mvp));
        gl.uniformMatrix4fv(gl.getUniformLocation(wireframeProgram, "modelMatrix"), false, flatten(model));
        gl.uniform1f(gl.getUniformLocation(wireframeProgram, "beatPulse"), beatPulse);
        gl.uniform1f(gl.getUniformLocation(wireframeProgram, "avgFreq"), avgFreq);
        gl.uniform1f(gl.getUniformLocation(wireframeProgram, "time"), timeElapsed);
        gl.uniform1f(gl.getUniformLocation(wireframeProgram, "bassFactor"), bassFactor);
        gl.uniform1f(gl.getUniformLocation(wireframeProgram, "glow"), glowActive);
        const lightPosition = [3.0, 3.0, 3.0];
        gl.uniform3fv(gl.getUniformLocation(wireframeProgram, "lightPosition"), lightPosition);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const wireframePositionLoc = gl.getAttribLocation(wireframeProgram, "position");
        gl.enableVertexAttribArray(wireframePositionLoc);
        gl.vertexAttribPointer(wireframePositionLoc, 3, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        const normalLoc = gl.getAttribLocation(wireframeProgram, "normal");
        gl.enableVertexAttribArray(normalLoc);
        gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0);
      }

      requestAnimationFrame(render);
    } catch (err) {
      console.error("Render error:", err);
      requestAnimationFrame(render);
    }
  }

  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  interaction.lastTime = performance.now();
  render();
}

// Start the loading process when the page loads
window.addEventListener("load", () => {
  simulateLoading();
});