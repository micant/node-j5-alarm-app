var Sound = require('node-aplay');
 
var track = new Sound('/home/pi/Audio/Chime.wav');

var isPlaying = false;
var counter = 0;


module.exports = function play() {
    if(!isPlaying) {
        if(counter <= 5) {
            track.play();
            isPlaying = true;
            counter ++;
            track.on('complete', function() {
                isPlaying = false; 
                play();
            });
        }
    }
}





