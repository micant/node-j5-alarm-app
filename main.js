var CronJob = require('cron').CronJob;
var PlayOnce = require('./school-bell-one');
var PlayFive = require('./school-bell-five');

const Raspi = require('raspi-io');
const five = require('johnny-five');
const Sound = require('node-aplay');
const board = new five.Board({
	io: new Raspi()
});

function test () {
	PlayOnce.play();
	console.log('test initiated');
	PlayOnce.on('complete', function () {
		console.log('test passed');
	});
}


console.log('application started');

//Button Interface
board.on('ready', () => { 
	const button1 = new five.Button({pin: "P1-11", isPullup: false});
	const button2 = new five.Button({pin: "P1-13", isPullup: false});
	
	const track1 = new Sound('/home/pi/Audio/AlertSound.wav');
	track1.on('complete', function() {
		console.log("Track 1 complete");
		track1isPlaying = false
	}); 

    	const track2 = new Sound('/home/pi/Audio/EvacuateSound.wav');
	track2.on('complete', function() {
		console.log("Track 2 complete");
		track2isPlaying = false;
	}); 
	
    	let track1isPlaying = false;
    	let track2isPlaying = false;

    	button1.on("hold", function() {
        	if(!track1isPlaying) {
			console.log( "Track 1 play" );
	    		track1.play();
	    		track1isPlaying = true;
	    	};
    	});
    
    	button1.on("up", function() {
		if(track1isPlaying){
			console.log("Track 1 off");
			track1.stop();
        		track1isPlaying = false;	
		};
    	});

    	button2.on("hold", function() {
        	if(!track2isPlaying) {
			console.log( "Track 2 play" );
			track2.play();
			track2isPlaying = true;
		};
     	});

    	button2.on("up", function() {
		if(track2isPlaying){
	       		console.log("Track 2 off");
		    	track2.stop();
            		track2isPlaying = false;	
		};
   	});
});

test();

//Cron Jobs

var corridorsOpen = new CronJob('00 30 08 * * 1-5', function() {
	console.log('playing corridors open');
	PlayOnce.play();
}, null, true, 'Australia/Melbourne').start();


var classroomsOpen = new CronJob('00 50 08 * * 1-5',function() {
	console.log('playing classrooms open');
	PlayOnce.play();
}, null, true, 'Australia/Melbourne').start();


var startClassInFive = new CronJob('00 55 08 * * 1-5',function() {
	console.log('playing class starts in five');
	PlayFive();
}, null, true, 'Australia/Melbourne').start();


var startClass = new CronJob('00 00 09 * * 1-5',function() {
	console.log('playing start class');
	PlayOnce.play();
}, null, true, 'Australia/Melbourne').start();


var recessEatingBell = new CronJob('00 00 11 * * 1-5', function() {
	console.log('playing recess eating bell');
	PlayOnce.Play();
}, null, true, 'Australia/Melbourne').start();


var recess = new CronJob('00 05 11 * * 1-5', function() {
	console.log('playing recess');
	PlayFive();
}, null, true, 'Australia/Melbourne').start();


var assembleRecess = new CronJob('00 25 11 * * 1-5', function() {
	console.log('playing assemble recess');
	PlayFive();
}, null, true, 'Australia/Melbourne').start();


var classStarts = new CronJob('00 30 11 * * 1-5', function() {
	console.log('playing class starts');
	PlayOnce.play();
}, null, true, 'Australia/Melbourne').start();


var lunchEatingBell = new CronJob('00 30 13 * * 1-5', function() {
	console.log('playing lunch eating bell');
	PlayOnce.play();
}, null, true, 'Australia/Melbourne').start();


var lunch = new CronJob('00 40 13 * * 1-5', function() {
	console.log('playing lunch');
	PlayFive();
}, null, true, 'Australia/Melbourne').start();


var assembleLunch = new CronJob('00 25 14 * * 1-5', function() {
	console.log('playing assemble');
	PlayFive();
}, null, true, 'Australia/Melbourne').start();


var classStartsLunch = new CronJob('00 30 14 * * 1-5', function() {
	console.log('playing class starts lunch');
	PlayOnce.play();
}, null, true, 'Australia/Melbourne').start();


var prayer = new CronJob('00 25 15 * * 1-5', function() {
	console.log('playing prayer');
	PlayOnce.play();
}, null, true, 'Australia/Melbourne').start();


var dismissal = new CronJob('00 30 15 * * 1-5', function() {
	console.log('playing dismissal');
	PlayFive();
}, null, true, 'Australia/Melbourne').start();


var busDutyEnds = new CronJob('00 45 15 * * 1-5', function() {
	console.log('playing bus duty ends');
	PlayOnce.play();
}, null, true, 'Australia/Melbourne').start();






