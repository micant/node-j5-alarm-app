var Sound = require('node-aplay');
 
var track = new Sound('/home/pi/Audio/Chime.wav');

var isPlaying = false;
var counter = 0;

track.on('complete', function() {
    isPlaying = false;
    counter++;
    playFive();
});

function playFive() {
    if(!isPlaying) {
        if(counter < 5) {
            track.play();
            isPlaying = true;
        } else {
	    counter = 0;
	}
    }
}

module.exports = function () {
    playFive();
}




