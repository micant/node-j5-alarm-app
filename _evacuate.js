const Raspi = require('raspi-io');
const five = require('johnny-five');
const Sound = require('node-aplay');
const board = new five.Board({
  io: new Raspi()
});

board.on('ready', () => { 

    const button1 = new five.Button({pin: "P1-11", isPullup: false});
    const button2 = new five.Button({pin: "P1-13", isPullup: false});

    const track1 = new Sound('../Audio/AlertSound.wav');
    const track2 = new Sound('../Audio/EvacuateSound.wav')
	
    let track1isPlaying = false;
    let track2isPlaying = false;

    button1.on("hold", function() {
        console.log( "Button 1 pressed" );
        if(!track1isPlaying) {
	    track1.play();
	    track1isPlaying = true;
	    track1.on('complete', function() {
	    	track1isPlaying = false; 
	    });
	}
    });
    
    button1.on("up", function() {
        console.log("up");
	if(track1isPlaying){
	    track1.pause();
            track1isPlaying = false;	
	}
    });

    button2.on("hold", function() {
        console.log( "Button 2 pressed" );
        if(!track2isPlaying) {
	    track2.play();
	    track2isPlaying = true;
	    track2.on('complete', function() {
	    	track2isPlaying = false; 
	    });
	}
     });

    button2.on("up", function() {
        console.log("up");
	if(track2isPlaying){
	    track2.pause();
            track2isPlaying = false;	
	}
    });

});



