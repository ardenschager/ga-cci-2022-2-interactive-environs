// console.log(Tone);

const majorScales = {
	C: ["C", "D", "E", "F", "G", "A", "B"],
	G: ["G", "A", "B", "C", "D", "E", "F#"],
	D: ["D", "E", "F#", "G", "A", "B", "C#"],
	A: ["A", "B", "C#", "D", "E", "F#", "G#"],
	E: ["E", "F#", "G#", "A", "B", "C#", "D#"],
	B: ["B", "C#", "D#", "E", "F#", "G#", "A#"],
	Gb: ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"],
	Db: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
	Ab: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
	Eb: ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
	Bb: ["Bb", "C", "D", "Eb", "F", "G", "A"],
	F: ["F", "G", "A", "Bb", "C", "D", "E"]
  }
  
  const minorScales = {
	C: ["F", "G", "A", "Bb", "C", "D", "E"],
	G: ["G", "A", "Bb", "C", "D", "Eb", "F"],
	D: ["D", "E", "F", "G", "A", "Bb", "C"],
	A: ["A", "B", "C", "D", "E", "F", "G"],
	E: ["E", "F#", "G", "A", "B", "C", "D"],
	B: ["B", "C#", "D", "E", "F#", "G", "A"],
	Gb: ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "Fb"],
	Db: ["Db", "Eb", "Fb", "Gb", "Ab", "Bb", "Cb"],
	Ab: ["Ab", "Bb", "Cb", "Db", "Eb", "Fb", "Gb"],
	Eb: ["Eb", "F", "Gb", "Ab", "Bb", "Cb", "Db"],
	Bb: ["Bb", "C", "Db", "Eb", "F", "Gb", "Ab"],
	F: ["F", "G", "Ab", "Bb", "C", "Db", "Eb"],
  }
  
  const minorChords =
  {
	"C": ["C", "Eb", "G"],
	"G": ["G", "Bb", "D"],
	"D": ["D", "F", "A"],
	"A": ["A", "C", "E"],
	"E": ["E", "G", "B"],
	"B": ["B", "D", "F#"],
	"Gb": ["Gb", "Bb", "Db"],
	"Db": ["Db", "Fb", "Ab"],
	"Ab": ["Ab", "Cb", "Eb"],
	"Eb": ["Eb", "Gb", "Bb"],
	"Bb": ["Bb", "Db", "F"],
	"F": ["F", "Ab", "C"],
  }
  
  
  const getScaleRange = (scale, mode, range) => {
  
	let notes;
	if (mode === 'major') {
	  notes = majorScales[scale];
	} else if (mode === 'minor') {
	  notes = minorScales[scale];
	} else {
	  console.error("That's not a mode built into the helper function, choose minor or major for now or download Tonal.js");
	}
  
	// assign numbers incrementing at C
	var overC = false;
	var noteRange = notes.map((el, i) => {
	  if (i > 0 && (el === 'C' || el === 'Db')) {
		overC = true;
	  }
  
	  if (overC) {
		el = `${el}${range + 1}`;
	  } else {
		el = `${el}${range}`;
	  }
	  return el;
	})
  
	return noteRange;
  }
  
  
  const getChord = (scale, mode, range) => {
  
	var notes
	if (mode === 'major') {
	  notes = getScaleRange(scale, mode, range);
	  return [notes[1], notes[3], notes[5]];
	} else if (mode === 'minor') {
	  notes = minorChords[scale];
	  var overC = false;
	  var noteRange = notes.map((el, i) => {
		if (i > 0 && (el === 'C' || el === 'Db')) {
		  overC = true;
		}
  
		if (overC) {
		  el = `${el}${range + 1}`;
		} else {
		  el = `${el}${range}`;
		}
		return el;
	  })
  
	  return noteRange;
	} else {
	  console.error("That's not a mode built into the helper function, choose minor or major for now or download Tonal.js");
	}
  }
  
  // Tonal.Scale.get()
  
  // create a synth and connect it to the main output (your speakers)
  let synthSettings = {
	  frequency: "C5",
	  detune: 0,
	  oscillator: {
		type: "sine"
	  },
	  filter: {
		Q: 6,
		type: "lowpass",
		rolloff: -24
	  },
	  envelope: {
		attack: 0.005,
		decay: 0.1,
		sustain: 0.9,
		release: 1
	  },
	  filterEnvelope: {
		attack: 0.2,
		decay: 0.5,
		sustain: 0.2,
		release: 2,
		baseFrequency: 300,
		octaves: 7,
		exponent: 2
	  }
  };
  
  let synth2Settings = {
	  frequency: "C3",
	  detune: 0,
	  oscillator: {
		type: "sine"
	  },
	  filter: {
		Q: 5,
		type: "lowpass",
		rolloff: -12
	  },
	  envelope: {
		attack: 4,
		decay: 0.1,
		sustain: 0.9,
		release: 1
	  },
	  filterEnvelope: {
		attack: 0.02,
		decay: 0.5,
		sustain: 0.2,
		release: 2,
		baseFrequency: 300,
		octaves: 5,
		exponent: 2
	  }
	};
  
  const delay = new Tone.FeedbackDelay({
	  delayTime: '8n',
	  wet: 0.9,
	  feedback: 0.8,
  });
  
  const notes = [...getScaleRange('Eb', 'major', 2)];
  
  
  // synth.chain(delay, Tone.Master);
  // synth.triggerAttackRelease("C1", "8n");
  // synth.triggerAttackRelease("C4", "8n");
  
  // const synth = new Tone.Synth().toDestination();
  
  // //play a middle 'C' for the duration of an 8th note
  // synth.triggerAttackRelease("C4", "8n");
  
  // const fatOsc = new Tone.FatOscillator("ab3", "sawtooth", 40).toDestination().start();
  
  
  
  //play a middle 'C' for the duration of an 8th note
  // synth.triggerAttackRelease("C4", "8n");
  
  
  
  // Copyright (c) 2019 ml5
  //
  // This software is released under the MIT License.
  // https://opensource.org/licenses/MIT
  
  /* ===
  ml5 Example
  PoseNet example using p5.js
  === */
  
  let video;
  let poseNet;
  let poses = [];
  
  let synth;
  let synth2;
  let osc;
  
  function setup() {
	createCanvas(640, 480);
	video = createCapture(VIDEO);
	video.size(width, height);
  
	// Create a new poseNet method with a single detection
	poseNet = ml5.poseNet(video, modelReady);
	// This sets up an event that fills the global variable "poses"
	// with an array every time new poses are detected
	poseNet.on('pose', function(results) {
	  poses = results;
	});
	// Hide the video element, and just show the canvas
	video.hide();
	synth = new Tone.MonoSynth(synthSettings).toMaster();
	synth2 = new Tone.MonoSynth(synth2Settings).toMaster();
	osc = new Tone.Oscillator(440, "sine").toMaster();
  }
  
  function modelReady() {
	// select('#status').html('Model Loaded');
  }
  
  function draw() {
	image(video, 0, 0, width, height);
  
	// We can call both functions to draw all keypoints and the skeletons
	drawKeypoints();
  //   drawSkeleton();
  }
  
  // A function to draw ellipses over the detected keypoints
  function drawKeypoints()  {
	// Loop through all the poses detected
	for (let i = 0; i < poses.length; i++) {
	  // For each pose detected, loop through all the keypoints
	  let pose = poses[i].pose;
	  for (let j = 0; j < pose.keypoints.length; j++) {
		// A keypoint is an object describing a body part (like rightArm or leftShoulder)
		let keypoint = pose.keypoints[j];
		// Only draw an ellipse is the pose probability is bigger than 0.2
		
		if ((j == 9 || j == 10) && keypoint.score > 0.2) {
		  fill( 255 * (Math.sin(keypoint.x / width / 2) * 0.5 + 0.5), 0, 255 * (Math.sin(keypoint.y / height / 2) * 0.5 + 0.5));
		  noStroke();
		  ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
		  let pos = keypoint.position;
		  if (j == 9) {
			  let d = dist(pos.x, pos.y, width/2, 0);
			  let idx = Math.floor((1 - d / height) * notes.length);
			  if (random() < 0.1 + 0.2 * d / height) {
				synth.triggerAttackRelease(notes[idx], "8n");
			  }
		  } else {
			  let d = dist(pos.x, pos.y, width/2, height);
			  let idx = Math.floor((1 - d / height) * notes.length);
			  if (random() < 0.1 + 0.2 * d / height) {
				synth2.triggerAttackRelease(notes[idx], "8n");
				// osc.frequency = 440 * (1 - d / height);
			  }
		  }
		}
	  }
	}
  }
  
  // A function to draw the skeletons
  function drawSkeleton() {
	// Loop through all the skeletons detected
	for (let i = 0; i < poses.length; i++) {
	  let skeleton = poses[i].skeleton;
	  // For every skeleton, loop through all body connections
	  for (let j = 0; j < skeleton.length; j++) {
		let partA = skeleton[j][0];
		let partB = skeleton[j][1];
		stroke(255 * j / skeleton.length, 0, 0);
		line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
	  }
	}
  }
  