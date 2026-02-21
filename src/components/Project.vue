<template>
  <div class="project-wrapper">
    <div class="canvas-container">
    <!-- Loading Screen -->
    <div id="loading-screen">
      <h1>Loading Interactive Sphere</h1>
      <div id="loading-bar-container">
        <div id="loading-bar"></div>
        <div id="loading-ball"></div>
      </div>
      <button id="start-loading-btn">Press To Start</button>
    </div>
    <!-- Main Content -->
    <div id="info">Drag to rotate · Scroll to zoom · Click to grab sphere</div>
    <div id="controls-container">
      <div class="control-group">
        <label for="speed-slider">Animation Speed</label>
        <input type="range" id="speed-slider" min="0.1" max="3" step="0.1" value="1" />
      </div>
      <div class="control-group">
        <button id="start-btn" class="control-btn">Start</button>
        <button id="stop-btn" class="control-btn">Stop</button>
      </div>
      <div class="control-group">
        <button id="upload-texture-btn" class="control-btn">Upload Texture</button>
        <input type="file" id="texture-upload" accept="image/*" style="display: none" />
      </div>
    </div>
    <canvas id="glCanvas"></canvas>
    </div>
  </div>


</template>

<script>
export default {
  name: 'BouncingSphere',
  mounted() {
    // Load external scripts after mount
    const mvScript = document.createElement('script');
    mvScript.src = './Common/MVnew.js';
    mvScript.async = true;
    document.body.appendChild(mvScript);

    const mainScript = document.createElement('script');
    mainScript.src = './script.js';
    mainScript.async = true;
    document.body.appendChild(mainScript);
  }
};
</script>

<style scoped>
.project-wrapper {
  min-height: calc(100vh - 160px); /* Full height minus header + footer */
  display: flex;
  flex-direction: column;
  justify-content: center; /* ✅ Vertical center */
  align-items: center;     /* ✅ Horizontal center */
  padding: 2rem;
  box-sizing: border-box;
}
.canvas-container {
  max-width: 960px;
  width: 100%;
  background: black;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  padding: 1rem;
}


body {
  margin: 0;
  overflow: hidden;
  background: #000;
}
canvas {
  display: block;
  width: 100%;
  height: 100%;
  cursor: grab;
}
#info {
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  font-family: Arial;
  pointer-events: none;
  text-shadow: 1px 1px 2px black;
}
#glCanvas {
  width: 100%;
  max-height: 500px;
  display: block;
  margin-bottom: 1rem;
}

#controls-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  width: 100%;
}
.control-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
.control-group label {
  color: white;
  font-family: Arial;
  font-size: 14px;
}
#speed-slider {
  width: 150px;
}
.control-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  min-width: 80px;
}
.control-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}
#start-btn {
  background: rgba(0, 200, 0, 0.5);
}
#stop-btn {
  background: rgba(200, 0, 0, 0.5);
}

/* Loading Screen Styles */
#loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  color: white;
  font-family: Arial;
}
#loading-bar-container {
  position: relative;
  width: 300px;
  height: 20px;
  background: #333;
  border-radius: 10px;
  margin: 20px 0;
  overflow: hidden;
}
#loading-bar {
  height: 100%;
  width: 0%;
  background: linear-gradient(to right, #ff0000, #8BC34A);
  transition: width 0.3s;
}
#loading-ball {
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 20px;
  height: 20px;
  background-color: rgb(0, 255, 81);
  border-radius: 50%;
  animation: bounceBall 2s infinite linear;
}
@keyframes bounceBall {
  0%   { transform: translateX(0px) translateY(0px); }
  10%  { transform: translateX(30px) translateY(-15px); }
  20%  { transform: translateX(60px) translateY(0px); }
  30%  { transform: translateX(90px) translateY(-15px); }
  40%  { transform: translateX(120px) translateY(0px); }
  50%  { transform: translateX(150px) translateY(-15px); }
  60%  { transform: translateX(180px) translateY(0px); }
  70%  { transform: translateX(210px) translateY(-15px); }
  80%  { transform: translateX(240px) translateY(0px); }
  90%  { transform: translateX(270px) translateY(-15px); }
  100% { transform: translateX(300px) translateY(0px); }
}
#start-loading-btn {
  display: none;
  padding: 12px 30px;
  font-size: 18px;
  background: #2d0692;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}
#start-loading-btn:hover {
  background: #2600ff;
}
</style>
