AFRAME.registerComponent('handpose', {

	init: function () {
		const video = document.getElementById('video');
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
			  video.srcObject = stream;
			  video.play();
			  console.log("asdf");
			});
		}
		this.init = false;
		this.spheres = []
		handpose = ml5.handpose(video, this.modelReady.bind(this));

		// This sets up an event that fills the global variable "keypoints"
		// with an array every time new hand poses are detected
		handpose.on("predict", results => {
			if (!this.init) {
				console.log("asdf");
				this.initialize(results);
			} else {
				this.trackTo(results);
			}
		});
	},

	modelReady: function () {
		console.log("Model ready!");
	},
	
	initializeSpheres: function (keypoints) {
		const scene = document.querySelector('a-scene');
		for (let i = 0; i < predictions.length; i += 1) {
			const prediction = predictions[i];
			for (let j = 0; j < prediction.landmarks.length; j += 1) {
				const sphere = document.createElement('a-sphere');
				scene.appendChild(sphere);
				this.spheres.push(sphere);
				console.log('hid');

			}
		}
		this.init = true;
	},
	
	trackSpheresTo: function (predictions) {
		for (let i = 0; i < predictions.length; i += 1) {
			const prediction = predictions[i];
			for (let j = 0; j < prediction.landmarks.length; j += 1) {
				const sphere = this.spheres[j];
				const landmark = prediction.landmarks[j];
				sphere.object3D.position.set(landmark.x, landmark.y, landmark.z);
				console.log('hi');
			}
		}
	},
});