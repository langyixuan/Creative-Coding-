/* eslint-disable */

let audioContext;
let audioBuffer;
let analyserNode;
let analyserData;
let gainNode;

function mousePressed() {
  playSound();
}

async function loadSound() {
  // Re-use the same context if it exists
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  // Re-use the audio buffer as a source
  if (!audioBuffer) {
    // Fetch MP3 from URL
    const resp = await fetch("audio.mp3");

    // Turn into an array buffer of raw binary data
    const buf = await resp.arrayBuffer();

    // Decode the entire binary MP3 into an AudioBuffer
    audioBuffer = await audioContext.decodeAudioData(buf);
  }

  // Setup a master gain node and AnalyserNode
  if (!gainNode) {
    // Create a gain and connect to destination
    gainNode = audioContext.createGain();

    // Create an Analyser Node
    analyserNode = audioContext.createAnalyser();

    // Create a Float32 array to hold the data
    analyserData = new Float32Array(analyserNode.fftSize);
    console.log(analyserData);

    // Connect the GainNode to the analyser
    gainNode.connect(analyserNode);

    // Connect GainNode to destination as well
    gainNode.connect(audioContext.destination);
  }
}

async function playSound() {
  // Snsure we are all loaded up
  await loadSound();

  // Snsure we are in a resumed state
  await audioContext.resume();

  // Now create a new "Buffer Source" node for playing AudioBuffers
  const source = audioContext.createBufferSource();

  // Connect to gain (which will be analyzed and also sent to destination)
  source.connect(gainNode);

  // Assign the loaded buffer
  source.buffer = audioBuffer;

  // Start (zero = play immediately)
  source.start(0);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // fill background
  background("rgba(0, 0, 0, 0.2)");

  if (analyserNode) {
    noFill();
    // stroke(255);

    // get time domain data
    // 将当前波形，或者时域数据拷贝进Float32Array (en-US)数组。
    analyserNode.getFloatTimeDomainData(analyserData);

    beginShape();
    for (let i = 0; i < analyserData.length; i++) {
      stroke(random(255), random(255), random(255));
      // -1...1
      const amplitude = analyserData[i];
      // stroke(random(255), random(255), random(255));
      const y = map(
        amplitude,
        -1,
        1,
        height / 2 - height / 2,
        height / 2 + height / 2
      );

      const x = map(i, 0, analyserData.length - 1, 0, width);

      vertex(x + frameCount * 0.3, y - height / 2 + frameCount);
      vertex(x, y + height / 2 - frameCount);

      // text(".", x + 200, y - 200);
      // text(".", x - 200, y + 200);
    }

    endShape();
  } else {
    fill("white");
    noStroke();
    // Draw a play button
    const dim = min(width, height);
    polygon(width / 2, height / 2, dim * 0.1, 3);
  }
}

// Draw a basic polygon, handles triangles, squares, pentagons, etc
function polygon(x, y, radius, sides = 3, angle = 0) {
  beginShape();
  for (let i = 0; i < sides; i++) {
    const a = angle + TWO_PI * (i / sides);
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
